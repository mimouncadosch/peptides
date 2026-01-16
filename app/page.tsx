import { getPeptides, getResellers, getLatestPrices } from '@/lib/db'
import Link from 'next/link'

// Revalidate data every hour
export const revalidate = 3600

function formatPrice(cents: number | null): string {
  if (cents === null) return '-'
  return `$${(cents / 100).toFixed(2)}`
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
    <div className="min-h-screen p-8">
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
        <div className="overflow-auto max-h-[calc(100vh-200px)] border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full border-collapse bg-white">
            <thead className="sticky top-0 z-20">
              <tr className="bg-gray-100">
                <th className="sticky left-0 z-30 bg-gray-100 text-left p-4 font-semibold text-gray-700 border-b min-w-[180px]">
                  Peptide
                </th>
                {resellers.map((reseller) => (
                  <th key={reseller.id} className="bg-gray-100 text-left p-4 font-semibold text-gray-700 border-b min-w-[150px]">
                    {reseller.base_url ? (
                      <a href={reseller.base_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        {reseller.name}
                      </a>
                    ) : (
                      reseller.name
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {peptides.map((peptide, idx) => (
                <tr key={peptide.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className={`sticky left-0 z-10 p-4 border-b min-w-[180px] ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="font-medium text-gray-900">{peptide.name}</div>
                    {peptide.full_name && (
                      <div className="text-xs text-gray-500">{peptide.full_name}</div>
                    )}
                  </td>
                  {resellers.map((reseller) => {
                    const priceData = priceMap.get(peptide.id)?.get(reseller.id)
                    return (
                      <td key={reseller.id} className="p-4 border-b">
                        {priceData ? (
                          <div>
                            <div className="font-medium text-gray-900">
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
                              <div className="text-xs text-green-600 font-medium mt-1">
                                {priceData.promotion}
                              </div>
                            )}
                            {priceData.shipping && (
                              <div className="text-xs text-gray-400">{priceData.shipping}</div>
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

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Prices updated daily via AI-powered crawling</p>
      </footer>
    </div>
  )
}
