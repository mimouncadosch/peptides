import { neon } from '@neondatabase/serverless'

// Create a SQL client using the pooled connection
export const sql = neon(process.env.DATABASE_URL!)

// Types for our database tables
export interface Peptide {
  id: string
  name: string
  full_name: string | null
}

export interface Reseller {
  id: string
  name: string
  base_url: string | null
}

export interface Price {
  id: number
  peptide_id: string
  reseller_id: string
  product_name: string | null
  price_cents: number | null
  original_price_cents: number | null
  sale_info: string | null
  bulk_pricing: string | null
  shipping: string | null
  return_policy: string | null
  product_url: string | null
  scraped_at: Date
}

// Get latest price for each peptide/reseller combination
export async function getLatestPrices(): Promise<Price[]> {
  const rows = await sql`
    SELECT DISTINCT ON (peptide_id, reseller_id)
      p.*,
      pep.name as peptide_name,
      pep.full_name as peptide_full_name,
      r.name as reseller_name,
      r.base_url as reseller_url
    FROM prices p
    JOIN peptides pep ON p.peptide_id = pep.id
    JOIN resellers r ON p.reseller_id = r.id
    ORDER BY peptide_id, reseller_id, scraped_at DESC
  `
  return rows as Price[]
}

// Get all peptides
export async function getPeptides(): Promise<Peptide[]> {
  const rows = await sql`SELECT * FROM peptides ORDER BY name`
  return rows as Peptide[]
}

// Get all resellers
export async function getResellers(): Promise<Reseller[]> {
  const rows = await sql`SELECT * FROM resellers ORDER BY name`
  return rows as Reseller[]
}

// Insert a new price record
export async function insertPrice(price: Omit<Price, 'id' | 'scraped_at'>) {
  await sql`
    INSERT INTO prices (peptide_id, reseller_id, product_name, price_cents, original_price_cents, sale_info, bulk_pricing, shipping, return_policy, product_url)
    VALUES (${price.peptide_id}, ${price.reseller_id}, ${price.product_name}, ${price.price_cents}, ${price.original_price_cents}, ${price.sale_info}, ${price.bulk_pricing}, ${price.shipping}, ${price.return_policy}, ${price.product_url})
  `
}

// Get price history for a specific peptide/reseller
export async function getPriceHistory(peptideId: string, resellerId: string) {
  const rows = await sql`
    SELECT * FROM prices
    WHERE peptide_id = ${peptideId} AND reseller_id = ${resellerId}
    ORDER BY scraped_at DESC
    LIMIT 30
  `
  return rows
}

// Get peptide/reseller combinations ordered by oldest scraped (for batch processing)
// Returns combos that have never been scraped first, then oldest scraped
export async function getOldestScrapedCombos(limit: number): Promise<Array<{
  peptide_id: string
  peptide_name: string
  reseller_id: string
  reseller_name: string
  reseller_base_url: string | null
  last_scraped: Date | null
}>> {
  const rows = await sql`
    WITH all_combos AS (
      SELECT
        p.id as peptide_id,
        p.name as peptide_name,
        r.id as reseller_id,
        r.name as reseller_name,
        r.base_url as reseller_base_url
      FROM peptides p
      CROSS JOIN resellers r
    ),
    latest_prices AS (
      SELECT DISTINCT ON (peptide_id, reseller_id)
        peptide_id,
        reseller_id,
        scraped_at as last_scraped
      FROM prices
      ORDER BY peptide_id, reseller_id, scraped_at DESC
    )
    SELECT
      ac.peptide_id,
      ac.peptide_name,
      ac.reseller_id,
      ac.reseller_name,
      ac.reseller_base_url,
      lp.last_scraped
    FROM all_combos ac
    LEFT JOIN latest_prices lp ON ac.peptide_id = lp.peptide_id AND ac.reseller_id = lp.reseller_id
    ORDER BY lp.last_scraped NULLS FIRST, ac.peptide_name, ac.reseller_name
    LIMIT ${limit}
  `
  return rows as Array<{
    peptide_id: string
    peptide_name: string
    reseller_id: string
    reseller_name: string
    reseller_base_url: string | null
    last_scraped: Date | null
  }>
}
