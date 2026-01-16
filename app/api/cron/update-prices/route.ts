import { NextResponse } from 'next/server'
import { sql, getPeptides, getResellers, insertPrice } from '@/lib/db'
import { scrapeUrl, extractPriceData } from '@/lib/ai'

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
  }> = []

  try {
    const [peptides, resellers] = await Promise.all([
      getPeptides(),
      getResellers(),
    ])

    // Get existing product URLs from latest prices
    const latestPrices = await sql`
      SELECT DISTINCT ON (peptide_id, reseller_id)
        peptide_id, reseller_id, product_url
      FROM prices
      WHERE product_url IS NOT NULL
      ORDER BY peptide_id, reseller_id, scraped_at DESC
    `

    // Create lookup map for product URLs
    const urlMap = new Map<string, string>()
    for (const price of latestPrices) {
      const key = `${price.peptide_id}:${price.reseller_id}`
      urlMap.set(key, price.product_url as string)
    }

    // Check if AI services are configured
    const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY
    const hasFirecrawlKey = !!process.env.FIRECRAWL_API_KEY

    console.log(`[Cron] Starting price update. Anthropic: ${hasAnthropicKey}, Firecrawl: ${hasFirecrawlKey}`)
    console.log(`[Cron] Found ${peptides.length} peptides, ${resellers.length} resellers, ${urlMap.size} URLs`)

    if (!hasAnthropicKey) {
      return NextResponse.json({
        success: false,
        error: 'ANTHROPIC_API_KEY not configured',
        message: 'Add your Anthropic API key to enable AI price extraction',
      }, { status: 500 })
    }

    // Process each peptide/reseller combination
    let processed = 0
    const total = peptides.length * resellers.length

    for (const peptide of peptides) {
      for (const reseller of resellers) {
        processed++
        const key = `${peptide.id}:${reseller.id}`
        const productUrl = urlMap.get(key)

        if (!productUrl) {
          results.push({
            peptide: peptide.name,
            reseller: reseller.name,
            status: 'skipped',
            message: 'No product URL',
          })
          continue
        }

        console.log(`[Cron] (${processed}/${total}) Scraping ${peptide.name} from ${reseller.name}...`)

        try {
          // Scrape the product page
          const content = await scrapeUrl(productUrl)

          if (!content) {
            console.log(`[Cron] Failed to scrape ${productUrl}`)
            results.push({
              peptide: peptide.name,
              reseller: reseller.name,
              status: 'error',
              message: 'Failed to scrape URL',
            })
            continue
          }

          console.log(`[Cron] Scraped ${content.length} chars, extracting price...`)

          // Extract price data using AI
          const priceData = await extractPriceData(content, peptide.name, reseller.name)

          if (!priceData) {
            console.log(`[Cron] Failed to extract price for ${peptide.name}`)
            results.push({
              peptide: peptide.name,
              reseller: reseller.name,
              status: 'error',
              message: 'Failed to extract price',
            })
            continue
          }

          console.log(`[Cron] Extracted: ${priceData.product_name} = $${(priceData.price_cents / 100).toFixed(2)}`)

          // Insert new price record
          await insertPrice({
            peptide_id: peptide.id,
            reseller_id: reseller.id,
            product_name: priceData.product_name,
            price_cents: priceData.price_cents,
            original_price_cents: priceData.original_price_cents || null,
            promotion: priceData.promotion || null,
            shipping: priceData.shipping || null,
            product_url: productUrl,
          })

          results.push({
            peptide: peptide.name,
            reseller: reseller.name,
            status: 'success',
          })

          // Rate limit: wait 1 second between requests
          await new Promise(resolve => setTimeout(resolve, 1000))
        } catch (error) {
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
    console.error('Cron job failed:', error)
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
