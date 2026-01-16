import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface ExtractedPrice {
  product_name: string
  price_cents: number
  original_price_cents?: number
  sale_info?: string
  bulk_pricing?: string
  shipping?: string
  return_policy?: string
}

export interface SearchResult {
  title: string
  url: string
  description: string
}

// Search for a peptide product on a reseller's site using Firecrawl
export async function searchForProduct(
  peptideName: string,
  resellerDomain: string
): Promise<SearchResult | null> {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY

  if (!firecrawlKey) {
    console.error('[Search] FIRECRAWL_API_KEY not configured')
    return null
  }

  try {
    const query = `buy ${peptideName} product site:${resellerDomain}`
    console.log(`[Search] Searching: "${query}"`)

    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        limit: 5,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Search] Firecrawl error:', errorText)
      return null
    }

    const data = await response.json()
    const results = data.data || []

    if (results.length === 0) {
      console.log(`[Search] No results found for "${query}"`)
      return null
    }

    // Return the first result
    const first = results[0]
    console.log(`[Search] Found: ${first.url}`)
    return {
      title: first.title || '',
      url: first.url,
      description: first.description || '',
    }
  } catch (error) {
    console.error('[Search] Search failed:', error)
    return null
  }
}

// Extract price data from scraped HTML/text content using Claude
export async function extractPriceData(
  content: string,
  peptideName: string,
  resellerName: string
): Promise<ExtractedPrice | null> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Extract the price information for the peptide "${peptideName}" from this content scraped from ${resellerName}'s website.

Return a JSON object with:
- product_name: The full product name/description (e.g., "BPC-157 5mg")
- price_cents: The current price in cents (e.g., 3999 for $39.99)
- original_price_cents: The original price in cents if there's a sale/discount (optional)
- sale_info: Any active sale or discount (e.g., "20% off", "Save $10", "Holiday Sale") (optional)
- bulk_pricing: Volume/quantity discounts (e.g., "Buy 3 save 5%", "10+ units: $35 each") (optional)
- shipping: Shipping information (e.g., "FREE USPS", "$5 flat rate", "Free over $100") (optional)
- return_policy: Return/refund policy (e.g., "30-day returns", "No returns on peptides") (optional)

If you cannot find price information for this peptide, return null.

Content:
${content.slice(0, 8000)}

Respond with ONLY the JSON object or null, no other text.`,
        },
      ],
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    if (responseText.toLowerCase().includes('null')) {
      return null
    }

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return null
    }

    return JSON.parse(jsonMatch[0]) as ExtractedPrice
  } catch (error) {
    console.error('Error extracting price data:', error)
    return null
  }
}

// Scrape a URL using Firecrawl
export async function scrapeUrl(url: string): Promise<string | null> {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY

  if (!firecrawlKey) {
    console.error('[Scrape] FIRECRAWL_API_KEY not configured')
    return null
  }

  try {
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${firecrawlKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
      }),
    })

    if (!response.ok) {
      console.error('[Scrape] Firecrawl error:', await response.text())
      return null
    }

    const data = await response.json()
    return data.data?.markdown || null
  } catch (error) {
    console.error('[Scrape] Failed:', error)
    return null
  }
}
