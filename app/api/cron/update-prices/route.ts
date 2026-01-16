import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getPeptides, getResellers, insertPrice } from '@/lib/db'
import { searchForProduct, scrapeUrl, extractPriceData } from '@/lib/ai'

// This endpoint is called by Vercel Cron daily
// Vercel Cron will call this with a GET request

export const maxDuration = 300 // 5 minutes max for Pro plan
export const dynamic = 'force-dynamic'

// Verify the request is from Vercel Cron (in production)
function verifyCronSecret(request: Request): boolean {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // In development, allow all requests
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  // In production, verify the secret
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true
  }

  return false
}

export async function GET(request: Request) {
  // Verify cron secret in production
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: Array<{
    peptide: string
    reseller: string
    status: 'success' | 'skipped' | 'error'
    message?: string
    url?: string
    price?: string
  }> = []

  try {
    const [peptides, resellers] = await Promise.all([
      getPeptides(),
      getResellers(),
    ])

    // Check if AI services are configured
    const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY
    const hasFirecrawlKey = !!process.env.FIRECRAWL_API_KEY

    console.log(`[Cron] Starting price update. Anthropic: ${hasAnthropicKey}, Firecrawl: ${hasFirecrawlKey}`)
    console.log(`[Cron] Processing ${peptides.length} peptides × ${resellers.length} resellers`)

    if (!hasAnthropicKey) {
      return NextResponse.json({
        success: false,
        error: 'ANTHROPIC_API_KEY not configured',
      }, { status: 500 })
    }

    if (!hasFirecrawlKey) {
      return NextResponse.json({
        success: false,
        error: 'FIRECRAWL_API_KEY not configured',
      }, { status: 500 })
    }

    // Process each peptide/reseller combination
    let processed = 0
    const total = peptides.length * resellers.length

    for (const peptide of peptides) {
      for (const reseller of resellers) {
        processed++
        console.log(`[Cron] (${processed}/${total}) ${peptide.name} @ ${reseller.name}`)

        try {
          // Step 1: Search for the product
          const searchResult = await searchForProduct(peptide.name, reseller.base_url || '')

          if (!searchResult) {
            results.push({
              peptide: peptide.name,
              reseller: reseller.name,
              status: 'skipped',
              message: 'Product not found in search',
            })
            continue
          }

          // Step 2: Scrape the product page
          console.log(`[Cron] Scraping ${searchResult.url}...`)
          const content = await scrapeUrl(searchResult.url)

          if (!content) {
            results.push({
              peptide: peptide.name,
              reseller: reseller.name,
              status: 'error',
              message: 'Failed to scrape URL',
              url: searchResult.url,
            })
            continue
          }

          console.log(`[Cron] Scraped ${content.length} chars, extracting price...`)

          // Step 3: Extract price data using AI
          const priceData = await extractPriceData(content, peptide.name, reseller.name)

          if (!priceData) {
            results.push({
              peptide: peptide.name,
              reseller: reseller.name,
              status: 'error',
              message: 'Failed to extract price',
              url: searchResult.url,
            })
            continue
          }

          console.log(`[Cron] Extracted: ${priceData.product_name} = $${(priceData.price_cents / 100).toFixed(2)}`)

          // Step 4: Insert new price record
          await insertPrice({
            peptide_id: peptide.id,
            reseller_id: reseller.id,
            product_name: priceData.product_name,
            price_cents: priceData.price_cents,
            original_price_cents: priceData.original_price_cents || null,
            sale_info: priceData.sale_info || null,
            bulk_pricing: priceData.bulk_pricing || null,
            shipping: priceData.shipping || null,
            return_policy: priceData.return_policy || null,
            product_url: searchResult.url,
          })

          results.push({
            peptide: peptide.name,
            reseller: reseller.name,
            status: 'success',
            url: searchResult.url,
            price: `$${(priceData.price_cents / 100).toFixed(2)}`,
          })

          // Rate limit: wait between requests to avoid hitting API limits
          await new Promise(resolve => setTimeout(resolve, 500))
        } catch (error) {
          console.error(`[Cron] Error processing ${peptide.name}@${reseller.name}:`, error)
          results.push({
            peptide: peptide.name,
            reseller: reseller.name,
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      }
    }

    const successCount = results.filter(r => r.status === 'success').length
    const errorCount = results.filter(r => r.status === 'error').length
    const skippedCount = results.filter(r => r.status === 'skipped').length

    console.log(`[Cron] Done. Success: ${successCount}, Errors: ${errorCount}, Skipped: ${skippedCount}`)

    // Revalidate the homepage to show fresh prices
    revalidatePath('/')
    console.log('[Cron] Revalidated homepage cache')

    return NextResponse.json({
      success: true,
      summary: {
        total: results.length,
        success: successCount,
        errors: errorCount,
        skipped: skippedCount,
      },
      results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Cron] Job failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Also support POST for manual triggers
export async function POST(request: Request) {
  return GET(request)
}
