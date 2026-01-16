#!/usr/bin/env node
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

// Load environment variables
config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)

// New resellers to add (researched from multiple sources)
const NEW_RESELLERS = [
  // Highly recommended vendors from multiple review sites
  { id: 'limitless-nootropics', name: 'Limitless Life Nootropics', base_url: 'https://limitlesslifenootropics.com' },
  { id: 'core-peptides', name: 'Core Peptides', base_url: 'https://www.corepeptides.com' },
  { id: 'soma-chems', name: 'Soma Chems', base_url: 'https://somachems.com' },
  { id: 'iron-peptides', name: 'Iron Peptides', base_url: 'https://ironpeptides.com' },
  { id: 'peptide-source', name: 'Peptide Source', base_url: 'https://peptidesource.com' },

  // Additional reputable vendors
  { id: 'amino-vault', name: 'AminoVault', base_url: 'https://aminovault.com' },
  { id: 'biolongevity-labs', name: 'BioLongevity Labs', base_url: 'https://biolongevetylabs.com' },
  { id: 'ascension-peptides', name: 'Ascension Peptides', base_url: 'https://ascensionpeptides.com' },
  { id: 'particle-peptides', name: 'Particle Peptides', base_url: 'https://particlepeptides.com' },
  { id: 'nextgen-peps', name: 'NextGenPeps', base_url: 'https://nextgenpeps.com' },
  { id: 'nextchems', name: 'NextChems', base_url: 'https://nextchems.com' },
  { id: 'paradigm-peptides', name: 'Paradigm Peptides', base_url: 'https://paradigmpeptides.com' },
  { id: 'direct-peptides', name: 'Direct Peptides', base_url: 'https://directpeptides.com' },

  // Other known vendors from Finnrick
  { id: 'loti-labs', name: 'Loti Labs', base_url: 'https://lotilabs.com' },
  { id: 'peptide-warehouse', name: 'Peptide Warehouse', base_url: 'https://peptidewarehouse.com' },
  { id: 'extreme-peptides', name: 'Extreme Peptides', base_url: 'https://extremepeptides.com' },
  { id: 'research-peptides', name: 'Research Peptides', base_url: 'https://researchpeptides.com' },
  { id: 'usa-peptide', name: 'USA Peptide', base_url: 'https://usapeptide.com' },
  { id: 'peptides-for-sale', name: 'Peptides For Sale', base_url: 'https://peptidesforsale.net' },
  { id: 'blue-sky-peptide', name: 'Blue Sky Peptide', base_url: 'https://blueskypeptide.com' },
]

async function addResellers() {
  console.log('Adding new resellers to database...\n')

  let added = 0
  let updated = 0

  for (const reseller of NEW_RESELLERS) {
    try {
      const existing = await sql`SELECT id FROM resellers WHERE id = ${reseller.id}`

      await sql`
        INSERT INTO resellers (id, name, base_url)
        VALUES (${reseller.id}, ${reseller.name}, ${reseller.base_url})
        ON CONFLICT (id) DO UPDATE SET name = ${reseller.name}, base_url = ${reseller.base_url}
      `

      if (existing.length > 0) {
        console.log(`  Updated: ${reseller.name}`)
        updated++
      } else {
        console.log(`  Added: ${reseller.name}`)
        added++
      }
    } catch (err) {
      console.error(`  Failed: ${reseller.name} - ${err.message}`)
    }
  }

  // List all resellers
  const allResellers = await sql`SELECT * FROM resellers ORDER BY name`
  console.log(`\n========================================`)
  console.log(`Total resellers in database: ${allResellers.length}`)
  console.log(`Added: ${added}, Updated: ${updated}`)
  console.log(`========================================\n`)

  console.log('All resellers:')
  allResellers.forEach(r => console.log(`  - ${r.name} (${r.base_url})`))

  console.log('\nDone!')
}

addResellers().catch(console.error)
