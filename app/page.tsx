import { getPeptides, getResellers, getLatestPrices } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'

// Revalidate data every 5 minutes
export const revalidate = 300

// Reseller logo mapping
const resellerLogos: Record<string, string> = {
  'peptide-sciences': '/logos/peptide-sciences.jpeg',
  'swiss-chems': '/logos/swiss-chems.svg',
  'biotech-peptides': '/logos/biotech-peptides.png',
  'purerawz': '/logos/pure-raws.jpeg',
  // 'amino-asylum': '/logos/amino-asylum.png',  // TODO: add logo
}

function formatPrice(cents: number | null): string {
  if (cents === null) return '-'
  return `$${(cents / 100).toFixed(2)}`
}

// Discount icon (tag)
function DiscountIcon() {
  return (
    <svg className="inline-block w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  )
}

// Shipping icon (truck)
function ShippingIcon() {
  return (
    <svg className="inline-block w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
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

  // Create a price lookup map: peptideId -> resellerId -> priceData
  const priceMap = new Map<string, Map<string, typeof prices[0]>>()
  for (const price of prices) {
    if (!priceMap.has(price.peptide_id)) {
      priceMap.set(price.peptide_id, new Map())
    }
    priceMap.get(price.peptide_id)!.set(price.reseller_id, price)
  }

  return (
    <div className="min-h-screen p-8 flex flex-col">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Peptide Price Aggregator</h1>
            <p className="text-gray-600 mt-1">Compare prices across resellers</p>
          </div>
          <Link
            href="/learn"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn about Peptides
          </Link>
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
          <div className="overflow-auto max-h-[calc(100vh-250px)] border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full border-collapse bg-white table-fixed">
              <thead className="sticky top-0 z-20">
                <tr className="bg-gray-100">
                  <th className="sticky left-0 z-30 bg-gray-100 text-left p-4 font-semibold text-gray-700 border-b w-[200px]">
                    Peptide
                  </th>
                  {resellers.map((reseller) => (
                    <th key={reseller.id} className="bg-gray-100 text-center p-4 font-semibold text-gray-700 border-b w-[180px]">
                      <div className="flex flex-col items-center gap-2">
                        {resellerLogos[reseller.id] && (
                          <Image
                            src={resellerLogos[reseller.id]}
                            alt={`${reseller.name} logo`}
                            width={80}
                            height={32}
                            className="object-contain h-8"
                          />
                        )}
                        {reseller.base_url ? (
                          <a href={reseller.base_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 text-sm">
                            {reseller.name}
                          </a>
                        ) : (
                          <span className="text-sm">{reseller.name}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {peptides.map((peptide, idx) => (
                  <tr key={peptide.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className={`sticky left-0 z-10 p-4 border-b w-[200px] ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <div className="font-medium text-gray-900">{peptide.name}</div>
                      {peptide.full_name && (
                        <div className="text-xs text-gray-500 mt-1">{peptide.full_name}</div>
                      )}
                    </td>
                    {resellers.map((reseller) => {
                      const priceData = priceMap.get(peptide.id)?.get(reseller.id)
                      return (
                        <td key={reseller.id} className="p-4 border-b w-[180px] align-top">
                          {priceData ? (
                            <div className="space-y-1">
                              <div className="font-semibold text-gray-900 text-lg">
                                {priceData.product_url ? (
                                  <a
                                    href={priceData.product_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600"
                                  >
                                    {formatPrice(priceData.price_cents)}
                                  </a>
                                ) : (
                                  formatPrice(priceData.price_cents)
                                )}
                              </div>
                              {priceData.product_name && (
                                <div className="text-xs text-gray-500">{priceData.product_name}</div>
                              )}
                              {priceData.promotion && (
                                <div className="text-xs text-green-600 font-medium flex items-center">
                                  <DiscountIcon />
                                  {priceData.promotion}
                                </div>
                              )}
                              {priceData.shipping && (
                                <div className="text-xs text-blue-500 flex items-center">
                                  <ShippingIcon />
                                  {priceData.shipping}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="mt-8 text-center text-sm text-gray-500 border-t pt-6">
        <p className="mb-1">Prices are updated daily at 6:00 AM UTC</p>
        <p>&copy; 2025 WithDrive, LLC. All rights reserved.</p>
      </footer>
    </div>
  )
}
