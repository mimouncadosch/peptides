#!/usr/bin/env node
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

// Load environment variables
config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)

async function migrate() {
  console.log('Adding new columns to prices table...')

  // Add sale_info column
  await sql`
    ALTER TABLE prices
    ADD COLUMN IF NOT EXISTS sale_info TEXT
  `
  console.log('Added sale_info column')

  // Add bulk_pricing column
  await sql`
    ALTER TABLE prices
    ADD COLUMN IF NOT EXISTS bulk_pricing TEXT
  `
  console.log('Added bulk_pricing column')

  // Add return_policy column
  await sql`
    ALTER TABLE prices
    ADD COLUMN IF NOT EXISTS return_policy TEXT
  `
  console.log('Added return_policy column')

  // Remove old promotion column if it exists (data migrated to sale_info/bulk_pricing)
  // Note: Keeping it for now in case there's data, can be removed later
  // await sql`ALTER TABLE prices DROP COLUMN IF EXISTS promotion`

  console.log('Migration complete!')
}

migrate().catch(console.error)
