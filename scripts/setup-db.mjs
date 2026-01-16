#!/usr/bin/env node
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

// Load environment variables
config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)

// Initial peptides data
const PEPTIDES = [
  { id: 'bpc-157', name: 'BPC-157', full_name: 'Body Protection Compound-157' },
  { id: 'tb-500', name: 'TB-500', full_name: 'Thymosin Beta-4' },
  { id: 'ghk-cu', name: 'GHK-Cu', full_name: 'Copper Peptide (Gly-His-Lys)' },
  { id: 'ipamorelin', name: 'Ipamorelin', full_name: 'Ipamorelin (Growth Hormone Secretagogue)' },
  { id: 'cjc-1295', name: 'CJC-1295', full_name: 'CJC-1295 (Modified GRF 1-29)' },
  { id: 'melanotan-2', name: 'Melanotan II', full_name: 'Melanotan II (MT-2)' },
  { id: 'selank', name: 'Selank', full_name: 'Selank (Synthetic Tuftsin Analog)' },
  { id: 'semax', name: 'Semax', full_name: 'Semax (ACTH 4-10 Analog)' },
  { id: 'epitalon', name: 'Epitalon', full_name: 'Epitalon (Epithalon)' },
  { id: 'dsip', name: 'DSIP', full_name: 'Delta Sleep-Inducing Peptide' },
  { id: 'pt-141', name: 'PT-141', full_name: 'Bremelanotide (PT-141)' },
  { id: 'aod-9604', name: 'AOD-9604', full_name: 'Advanced Obesity Drug 9604' },
]

// Initial resellers data
const RESELLERS = [
  { id: 'peptide-sciences', name: 'Peptide Sciences', base_url: 'https://www.peptidesciences.com' },
  { id: 'swiss-chems', name: 'Swiss Chems', base_url: 'https://swisschems.is' },
  { id: 'amino-asylum', name: 'Amino Asylum', base_url: 'https://aminoasylum.shop' },
  { id: 'purerawz', name: 'PureRawz', base_url: 'https://www.purerawz.co' },
  { id: 'biotech-peptides', name: 'Biotech Peptides', base_url: 'https://biotechpeptides.com' },
]

// Initial prices
const INITIAL_PRICES = [
  // BPC-157
  { peptide_id: 'bpc-157', reseller_id: 'peptide-sciences', product_name: 'BPC-157 5mg', price_cents: 3999, product_url: 'https://www.peptidesciences.com/bpc-157-5mg' },
  { peptide_id: 'bpc-157', reseller_id: 'swiss-chems', product_name: 'BPC-157 5mg', price_cents: 4295, product_url: 'https://swisschems.is/product/bpc-157-5mg' },
  { peptide_id: 'bpc-157', reseller_id: 'amino-asylum', product_name: 'BPC-157 5mg', price_cents: 3699, product_url: 'https://aminoasylum.shop/product/bpc-157' },
  // TB-500
  { peptide_id: 'tb-500', reseller_id: 'peptide-sciences', product_name: 'TB-500 2mg', price_cents: 3299, product_url: 'https://www.peptidesciences.com/tb-500-2mg' },
  { peptide_id: 'tb-500', reseller_id: 'swiss-chems', product_name: 'TB-500 5mg', price_cents: 5495, product_url: 'https://swisschems.is/product/tb-500-5mg' },
  { peptide_id: 'tb-500', reseller_id: 'purerawz', product_name: 'TB-500 5mg', price_cents: 4999, product_url: 'https://www.purerawz.co/products/tb-500' },
  // GHK-Cu
  { peptide_id: 'ghk-cu', reseller_id: 'peptide-sciences', product_name: 'GHK-Cu 50mg', price_cents: 4499, product_url: 'https://www.peptidesciences.com/ghk-cu-50mg' },
  { peptide_id: 'ghk-cu', reseller_id: 'swiss-chems', product_name: 'GHK-Cu 50mg', price_cents: 4795, product_url: 'https://swisschems.is/product/ghk-cu' },
  { peptide_id: 'ghk-cu', reseller_id: 'biotech-peptides', product_name: 'GHK-Cu 100mg', price_cents: 7999, product_url: 'https://biotechpeptides.com/product/ghk-cu' },
  // Ipamorelin
  { peptide_id: 'ipamorelin', reseller_id: 'peptide-sciences', product_name: 'Ipamorelin 5mg', price_cents: 2999, product_url: 'https://www.peptidesciences.com/ipamorelin-5mg' },
  { peptide_id: 'ipamorelin', reseller_id: 'amino-asylum', product_name: 'Ipamorelin 5mg', price_cents: 2799, product_url: 'https://aminoasylum.shop/product/ipamorelin' },
  { peptide_id: 'ipamorelin', reseller_id: 'purerawz', product_name: 'Ipamorelin 5mg', price_cents: 3199, product_url: 'https://www.purerawz.co/products/ipamorelin' },
  // CJC-1295
  { peptide_id: 'cjc-1295', reseller_id: 'peptide-sciences', product_name: 'CJC-1295 DAC 2mg', price_cents: 4299, product_url: 'https://www.peptidesciences.com/cjc-1295-dac-2mg' },
  { peptide_id: 'cjc-1295', reseller_id: 'swiss-chems', product_name: 'CJC-1295 DAC 2mg', price_cents: 4595, product_url: 'https://swisschems.is/product/cjc-1295-dac' },
  { peptide_id: 'cjc-1295', reseller_id: 'amino-asylum', product_name: 'CJC-1295 no DAC 2mg', price_cents: 3499, product_url: 'https://aminoasylum.shop/product/cjc-1295' },
  // Melanotan II
  { peptide_id: 'melanotan-2', reseller_id: 'peptide-sciences', product_name: 'Melanotan II 10mg', price_cents: 2999, product_url: 'https://www.peptidesciences.com/melanotan-2-10mg' },
  { peptide_id: 'melanotan-2', reseller_id: 'swiss-chems', product_name: 'Melanotan II 10mg', price_cents: 3295, product_url: 'https://swisschems.is/product/melanotan-ii' },
  { peptide_id: 'melanotan-2', reseller_id: 'purerawz', product_name: 'Melanotan II 10mg', price_cents: 2799, product_url: 'https://www.purerawz.co/products/melanotan-ii' },
  // Selank
  { peptide_id: 'selank', reseller_id: 'peptide-sciences', product_name: 'Selank 5mg', price_cents: 4999, product_url: 'https://www.peptidesciences.com/selank-5mg' },
  { peptide_id: 'selank', reseller_id: 'swiss-chems', product_name: 'Selank Nasal 5mg', price_cents: 5295, product_url: 'https://swisschems.is/product/selank' },
  { peptide_id: 'selank', reseller_id: 'biotech-peptides', product_name: 'Selank 10mg', price_cents: 8499, product_url: 'https://biotechpeptides.com/product/selank' },
  // Semax
  { peptide_id: 'semax', reseller_id: 'peptide-sciences', product_name: 'Semax 5mg', price_cents: 5499, product_url: 'https://www.peptidesciences.com/semax-5mg' },
  { peptide_id: 'semax', reseller_id: 'swiss-chems', product_name: 'Semax Nasal 5mg', price_cents: 5795, product_url: 'https://swisschems.is/product/semax' },
  { peptide_id: 'semax', reseller_id: 'amino-asylum', product_name: 'Semax 10mg', price_cents: 7499, product_url: 'https://aminoasylum.shop/product/semax' },
  // Epitalon
  { peptide_id: 'epitalon', reseller_id: 'peptide-sciences', product_name: 'Epitalon 10mg', price_cents: 5999, product_url: 'https://www.peptidesciences.com/epitalon-10mg' },
  { peptide_id: 'epitalon', reseller_id: 'swiss-chems', product_name: 'Epitalon 10mg', price_cents: 6495, product_url: 'https://swisschems.is/product/epitalon' },
  { peptide_id: 'epitalon', reseller_id: 'purerawz', product_name: 'Epitalon 20mg', price_cents: 8999, product_url: 'https://www.purerawz.co/products/epitalon' },
  // DSIP
  { peptide_id: 'dsip', reseller_id: 'peptide-sciences', product_name: 'DSIP 5mg', price_cents: 4799, product_url: 'https://www.peptidesciences.com/dsip-5mg' },
  { peptide_id: 'dsip', reseller_id: 'swiss-chems', product_name: 'DSIP 5mg', price_cents: 4995, product_url: 'https://swisschems.is/product/dsip' },
  { peptide_id: 'dsip', reseller_id: 'biotech-peptides', product_name: 'DSIP 5mg', price_cents: 4499, product_url: 'https://biotechpeptides.com/product/dsip' },
  // PT-141
  { peptide_id: 'pt-141', reseller_id: 'peptide-sciences', product_name: 'PT-141 10mg', price_cents: 4499, product_url: 'https://www.peptidesciences.com/pt-141-10mg' },
  { peptide_id: 'pt-141', reseller_id: 'swiss-chems', product_name: 'PT-141 10mg', price_cents: 4795, product_url: 'https://swisschems.is/product/pt-141' },
  { peptide_id: 'pt-141', reseller_id: 'amino-asylum', product_name: 'PT-141 10mg', price_cents: 3999, product_url: 'https://aminoasylum.shop/product/pt-141' },
  // AOD-9604
  { peptide_id: 'aod-9604', reseller_id: 'peptide-sciences', product_name: 'AOD-9604 2mg', price_cents: 3499, product_url: 'https://www.peptidesciences.com/aod-9604-2mg' },
  { peptide_id: 'aod-9604', reseller_id: 'swiss-chems', product_name: 'AOD-9604 2mg', price_cents: 3795, product_url: 'https://swisschems.is/product/aod-9604' },
  { peptide_id: 'aod-9604', reseller_id: 'purerawz', product_name: 'AOD-9604 5mg', price_cents: 5999, product_url: 'https://www.purerawz.co/products/aod-9604' },
]

async function setupDatabase() {
  console.log('Creating tables...')

  // Create peptides table
  await sql`
    CREATE TABLE IF NOT EXISTS peptides (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      full_name TEXT
    )
  `

  // Create resellers table
  await sql`
    CREATE TABLE IF NOT EXISTS resellers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      base_url TEXT
    )
  `

  // Create prices table
  await sql`
    CREATE TABLE IF NOT EXISTS prices (
      id SERIAL PRIMARY KEY,
      peptide_id TEXT REFERENCES peptides(id),
      reseller_id TEXT REFERENCES resellers(id),
      product_name TEXT,
      price_cents INTEGER,
      original_price_cents INTEGER,
      promotion TEXT,
      shipping TEXT,
      product_url TEXT,
      scraped_at TIMESTAMP DEFAULT NOW()
    )
  `

  // Create index
  await sql`
    CREATE INDEX IF NOT EXISTS idx_prices_latest
    ON prices(peptide_id, reseller_id, scraped_at DESC)
  `

  console.log('Tables created!')

  // Seed peptides
  console.log('Seeding peptides...')
  for (const peptide of PEPTIDES) {
    await sql`
      INSERT INTO peptides (id, name, full_name)
      VALUES (${peptide.id}, ${peptide.name}, ${peptide.full_name})
      ON CONFLICT (id) DO UPDATE SET name = ${peptide.name}, full_name = ${peptide.full_name}
    `
  }

  // Seed resellers
  console.log('Seeding resellers...')
  for (const reseller of RESELLERS) {
    await sql`
      INSERT INTO resellers (id, name, base_url)
      VALUES (${reseller.id}, ${reseller.name}, ${reseller.base_url})
      ON CONFLICT (id) DO UPDATE SET name = ${reseller.name}, base_url = ${reseller.base_url}
    `
  }

  // Check if prices already exist
  const existingPrices = await sql`SELECT COUNT(*) as count FROM prices`
  if (existingPrices[0].count === '0') {
    console.log('Seeding initial prices...')
    for (const price of INITIAL_PRICES) {
      await sql`
        INSERT INTO prices (peptide_id, reseller_id, product_name, price_cents, product_url)
        VALUES (${price.peptide_id}, ${price.reseller_id}, ${price.product_name}, ${price.price_cents}, ${price.product_url})
      `
    }
  } else {
    console.log('Prices already exist, skipping seed...')
  }

  console.log('Database setup complete!')
}

setupDatabase().catch(console.error)
