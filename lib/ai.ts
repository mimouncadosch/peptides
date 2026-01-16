import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface ExtractedPrice {
  product_name: string
  price_cents: number
  original_price_cents?: number
  promotion?: string
  shipping?: string
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
- original_price_cents: The original price in cents if there's a discount (optional)
- promotion: Any active promotion or discount code (optional)
- shipping: Shipping information if available (optional)

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

// Scrape a URL using Firecrawl (or fallback to basic fetch)
export async function scrapeUrl(url: string): Promise<string | null> {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY

  if (firecrawlKey) {
    // Use Firecrawl API
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
        console.error('Firecrawl error:', await response.text())
        return null
      }

      const data = await response.json()
      return data.data?.markdown || null
    } catch (error) {
      console.error('Firecrawl scrape failed:', error)
      return null
    }
  } else {
    // Fallback: basic fetch (may not work for JS-heavy sites)
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PeptidePriceBot/1.0)',
        },
      })
      return await response.text()
    } catch (error) {
      console.error('Basic fetch failed:', error)
      return null
    }
  }
}
