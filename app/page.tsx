import { getPeptides, getResellers, getLatestPrices } from '@/lib/db'
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

// Sale icon (percent badge)
function SaleIcon() {
  return (
    <svg className="inline-block w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
    </svg>
  )
}

// Bulk pricing icon (stack/layers)
function BulkIcon() {
  return (
    <svg className="inline-block w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
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

// Return policy icon (refresh/arrow)
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

  // Create a price lookup map: peptideId -> resellerId -> priceData
  const priceMap = new Map<string, Map<string, typeof prices[0]>>()
  for (const price of prices) {
    if (!priceMap.has(price.peptide_id)) {
      priceMap.set(price.peptide_id, new Map())
    }
    priceMap.get(price.peptide_id)!.set(price.reseller_id, price)
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col">
      <header className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">PeptideWatch</h1>
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
          <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {peptides.map((peptide) => (
                <div key={peptide.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-100 p-3 border-b">
                    <div className="font-semibold text-gray-900">{peptide.name}</div>
                    {peptide.full_name && (
                      <div className="text-xs text-gray-500 mt-0.5">{peptide.full_name}</div>
                    )}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {resellers.map((reseller) => {
                      const priceData = priceMap.get(peptide.id)?.get(reseller.id)
                      return (
                        <div key={reseller.id} className="p-3 flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {resellerLogos[reseller.id] && (
                              <Image
                                src={resellerLogos[reseller.id]}
                                alt={`${reseller.name} logo`}
                                width={40}
                                height={20}
                                className="object-contain h-5"
                              />
                            )}
                            <span className="text-sm text-gray-600">{reseller.name}</span>
                          </div>
                          <div className="text-right flex-1 ml-4">
                            {priceData ? (
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-900 text-lg">
                                  {priceData.product_url ? (
                                    <a href={priceData.product_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                      {formatPrice(priceData.price_cents)}
                                    </a>
                                  ) : formatPrice(priceData.price_cents)}
                                </div>
                                {priceData.sale_info && (
                                  <div className="text-xs text-red-600 flex items-center justify-end">
                                    <SaleIcon />{priceData.sale_info}
                                  </div>
                                )}
                                {priceData.bulk_pricing && (
                                  <div className="text-xs text-purple-600 flex items-center justify-end">
                                    <BulkIcon />{priceData.bulk_pricing}
                                  </div>
                                )}
                                {priceData.shipping && (
                                  <div className="text-xs text-blue-500 flex items-center justify-end">
                                    <ShippingIcon />{priceData.shipping}
                                  </div>
                                )}
                                {priceData.return_policy && (
                                  <div className="text-xs text-gray-500 flex items-center justify-end">
                                    <ReturnIcon />{priceData.return_policy}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-auto max-h-[calc(100vh-250px)] border border-gray-200 rounded-lg shadow-sm">
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
                  {peptides.map((peptide) => (
                    <tr key={peptide.id} className="group bg-white">
                      <td className="sticky left-0 z-10 p-4 border-b w-[200px] bg-white group-hover:bg-gray-50">
                        <div className="font-medium text-gray-900">{peptide.name}</div>
                        {peptide.full_name && (
                          <div className="text-xs text-gray-500 mt-1">{peptide.full_name}</div>
                        )}
                      </td>
                      {resellers.map((reseller) => {
                        const priceData = priceMap.get(peptide.id)?.get(reseller.id)
                        return (
                          <td key={reseller.id} className="p-4 border-b w-[180px] align-top group-hover:bg-gray-50">
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
                                {priceData.sale_info && (
                                  <div className="text-xs text-red-600 font-medium flex items-center">
                                    <SaleIcon />
                                    {priceData.sale_info}
                                  </div>
                                )}
                                {priceData.bulk_pricing && (
                                  <div className="text-xs text-purple-600 font-medium flex items-center">
                                    <BulkIcon />
                                    {priceData.bulk_pricing}
                                  </div>
                                )}
                                {priceData.shipping && (
                                  <div className="text-xs text-blue-500 flex items-center">
                                    <ShippingIcon />
                                    {priceData.shipping}
                                  </div>
                                )}
                                {priceData.return_policy && (
                                  <div className="text-xs text-gray-500 flex items-center">
                                    <ReturnIcon />
                                    {priceData.return_policy}
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
          </>
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
