import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getOldestScrapedCombos, insertPrice } from '@/lib/db'
import { searchForProduct, scrapeUrl, extractPriceData } from '@/lib/ai'

// This endpoint is called by Vercel Cron twice daily (6am and 6pm UTC)
// Processes a batch of 15 peptide/reseller combos per run to avoid timeout

const BATCH_SIZE = 300

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
    // Check if AI services are configured
    const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY
    const hasFirecrawlKey = !!process.env.FIRECRAWL_API_KEY

    console.log(`[Cron] Starting price update. Anthropic: ${hasAnthropicKey}, Firecrawl: ${hasFirecrawlKey}`)

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

    // Get the oldest scraped combos (batch processing)
    const combos = await getOldestScrapedCombos(BATCH_SIZE)
    console.log(`[Cron] Processing batch of ${combos.length} combos (oldest first)`)

    // Process each combo in the batch
    for (let i = 0; i < combos.length; i++) {
      const combo = combos[i]
      console.log(`[Cron] (${i + 1}/${combos.length}) ${combo.peptide_name} @ ${combo.reseller_name}`)

      try {
        // Step 1: Search for the product
        const searchResult = await searchForProduct(combo.peptide_name, combo.reseller_base_url || '')

        if (!searchResult) {
          results.push({
            peptide: combo.peptide_name,
            reseller: combo.reseller_name,
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
            peptide: combo.peptide_name,
            reseller: combo.reseller_name,
            status: 'error',
            message: 'Failed to scrape URL',
            url: searchResult.url,
          })
          continue
        }

        console.log(`[Cron] Scraped ${content.length} chars, extracting price...`)

        // Step 3: Extract price data using AI
        const priceData = await extractPriceData(content, combo.peptide_name, combo.reseller_name)

        if (!priceData) {
          results.push({
            peptide: combo.peptide_name,
            reseller: combo.reseller_name,
            status: 'error',
            message: 'Failed to extract price',
            url: searchResult.url,
          })
          continue
        }

        console.log(`[Cron] Extracted: ${priceData.product_name} = $${(priceData.price_cents / 100).toFixed(2)}`)

        // Step 4: Insert new price record
        await insertPrice({
          peptide_id: combo.peptide_id,
          reseller_id: combo.reseller_id,
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
          peptide: combo.peptide_name,
          reseller: combo.reseller_name,
          status: 'success',
          url: searchResult.url,
          price: `$${(priceData.price_cents / 100).toFixed(2)}`,
        })

        // Rate limit: wait between requests to avoid hitting API limits
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`[Cron] Error processing ${combo.peptide_name}@${combo.reseller_name}:`, error)
        results.push({
          peptide: combo.peptide_name,
          reseller: combo.reseller_name,
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        })
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
