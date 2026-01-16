import Image from 'next/image'
import { getPeptides, getResellers, getLatestPrices } from '@/lib/db'
import PriceTable from './components/PriceTable'

// Revalidate data every 5 minutes
export const revalidate = 300

// Icons for legend
function SaleIcon() {
  return (
    <svg className="inline-block w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
    </svg>
  )
}

function BulkIcon() {
  return (
    <svg className="inline-block w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )
}

function ShippingIcon() {
  return (
    <svg className="inline-block w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
    </svg>
  )
}

function ReturnIcon() {
  return (
    <svg className="inline-block w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
    </svg>
  )
}

export default async function AggregatorPage() {
  let peptides: Awaited<ReturnType<typeof getPeptides>> = []
  let resellers: Awaited<ReturnType<typeof getResellers>> = []
  let prices: Awaited<ReturnType<typeof getLatestPrices>> = []
  let error: string | null = null

  try {
    ;[peptides, resellers, prices] = await Promise.all([
      getPeptides(),
      getResellers(),
      getLatestPrices(),
    ])
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load data'
  }


  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col">
      <header className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <Image
              src="/logos/peptide-watch.jpg"
              alt="PeptideWatch"
              width={300}
              height={168}
              className="h-20 md:h-24 w-auto"
              priority
            />
            <p className="text-gray-600 mt-1 text-sm md:text-base">We find prices across peptide resellers</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-gray-500">
            <span className="flex items-center text-red-600"><SaleIcon />Sale</span>
            <span className="flex items-center text-purple-600"><BulkIcon />Bulk</span>
            <span className="flex items-center text-blue-500"><ShippingIcon />Ship</span>
            <span className="flex items-center text-gray-500"><ReturnIcon />Returns</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <p className="font-medium">Error loading data</p>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-sm mt-2">Make sure the database is set up. Run: <code className="bg-red-100 px-1 rounded">npm run db:setup</code></p>
          </div>
        ) : peptides.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
            <p className="font-medium">No data yet</p>
            <p className="text-sm mt-1">The database is empty. Run the setup script to seed initial data.</p>
          </div>
        ) : (
          <PriceTable peptides={peptides} resellers={resellers} prices={prices} />
        )}
      </main>

      <footer className="mt-6 md:mt-8 text-center text-sm text-gray-300 bg-gray-800 py-6 -mx-4 md:-mx-8 -mb-4 md:-mb-8 px-4 md:px-8">
        <p className="mb-1">Prices are updated twice daily</p>
        <p className="mb-3">&copy; 2025 WithDrive, LLC. All rights reserved.</p>
        <p className="text-xs text-gray-400">All products listed are for Research Use Only (RUO). Not for human consumption.</p>
      </footer>
    </div>
  )
}
