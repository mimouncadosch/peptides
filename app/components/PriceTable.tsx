'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'

// Types
type Peptide = {
  id: string
  name: string
  full_name: string | null
}

type Reseller = {
  id: string
  name: string
  base_url: string | null
}

type Price = {
  peptide_id: string
  reseller_id: string
  price_cents: number | null
  product_name: string | null
  product_url: string | null
  sale_info: string | null
  bulk_pricing: string | null
  shipping: string | null
  return_policy: string | null
}

type Basket = {
  reseller: Reseller
  items: { peptide: Peptide; price: Price }[]
  total: number
  missingPeptides: Peptide[]
}

// Reseller logo mapping
const resellerLogos: Record<string, string> = {
  'peptide-sciences': '/logos/peptide-sciences.jpeg',
  'swiss-chems': '/logos/swiss-chems.svg',
  'biotech-peptides': '/logos/biotech-peptides.png',
  'purerawz': '/logos/pure-raws.jpeg',
}

function formatPrice(cents: number | null): string {
  if (cents === null) return '-'
  return `$${(cents / 100).toFixed(2)}`
}

// Icons
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

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

interface PriceTableProps {
  peptides: Peptide[]
  resellers: Reseller[]
  prices: Price[]
}

export default function PriceTable({ peptides, resellers, prices }: PriceTableProps) {
  const [selectedPeptides, setSelectedPeptides] = useState<Set<string>>(new Set())
  const [showMobileBasket, setShowMobileBasket] = useState(false)

  // Create price lookup map: peptideId -> resellerId -> priceData
  const priceMap = useMemo(() => {
    const map = new Map<string, Map<string, Price>>()
    for (const price of prices) {
      if (!map.has(price.peptide_id)) {
        map.set(price.peptide_id, new Map())
      }
      map.get(price.peptide_id)!.set(price.reseller_id, price)
    }
    return map
  }, [prices])

  const togglePeptide = (peptideId: string) => {
    setSelectedPeptides(prev => {
      const next = new Set(prev)
      if (next.has(peptideId)) {
        next.delete(peptideId)
      } else {
        next.add(peptideId)
      }
      return next
    })
  }

  // Calculate baskets when peptides are selected
  const baskets = useMemo(() => {
    if (selectedPeptides.size === 0) return []

    const selectedPeptidesList = peptides.filter(p => selectedPeptides.has(p.id))

    // Calculate total for each reseller (single-reseller baskets)
    const resellerBaskets: Basket[] = resellers.map(reseller => {
      const items: { peptide: Peptide; price: Price }[] = []
      const missingPeptides: Peptide[] = []
      let total = 0

      for (const peptide of selectedPeptidesList) {
        const price = priceMap.get(peptide.id)?.get(reseller.id)
        if (price && price.price_cents !== null) {
          items.push({ peptide, price })
          total += price.price_cents
        } else {
          missingPeptides.push(peptide)
        }
      }

      return { reseller, items, total, missingPeptides }
    })

    // Filter out baskets that can't fulfill any items, then sort by total
    return resellerBaskets
      .filter(b => b.items.length > 0)
      .sort((a, b) => {
        // Prioritize complete baskets (no missing peptides)
        if (a.missingPeptides.length === 0 && b.missingPeptides.length > 0) return -1
        if (b.missingPeptides.length === 0 && a.missingPeptides.length > 0) return 1
        // Then sort by price
        return a.total - b.total
      })
      .slice(0, 3)
  }, [selectedPeptides, peptides, resellers, priceMap])

  const hasSelection = selectedPeptides.size > 0

  return (
    <div className={`flex gap-4 transition-all duration-300 ease-in-out ${hasSelection ? 'md:pr-80' : ''}`}>
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 italic mb-4">Select the peptides you need and we'll show you the cheapest way to buy them</p>
        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {peptides.map((peptide) => {
            const isSelected = selectedPeptides.has(peptide.id)
            return (
              <div
                key={peptide.id}
                onClick={() => togglePeptide(peptide.id)}
                className={`bg-white rounded-lg shadow-sm border-2 overflow-hidden cursor-pointer transition-colors ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className={`p-3 border-b flex items-center justify-between ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <div>
                    <div className="font-semibold text-gray-900">{peptide.name}</div>
                    {peptide.full_name && (
                      <div className="text-xs text-gray-500 mt-0.5">{peptide.full_name}</div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="bg-blue-500 text-white rounded-full p-1">
                      <CheckIcon />
                    </div>
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
                                {formatPrice(priceData.price_cents)}
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
            )
          })}
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
              {peptides.map((peptide) => {
                const isSelected = selectedPeptides.has(peptide.id)
                return (
                  <tr
                    key={peptide.id}
                    onClick={() => togglePeptide(peptide.id)}
                    className={`group cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <td className={`sticky left-0 z-10 p-4 border-b w-[200px] transition-colors ${
                      isSelected ? 'bg-blue-50' : 'bg-white group-hover:bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <div className="bg-blue-500 text-white rounded-full p-0.5 flex-shrink-0">
                            <CheckIcon />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{peptide.name}</div>
                          {peptide.full_name && (
                            <div className="text-xs text-gray-500 mt-1">{peptide.full_name}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    {resellers.map((reseller) => {
                      const priceData = priceMap.get(peptide.id)?.get(reseller.id)
                      return (
                        <td key={reseller.id} className={`p-4 border-b w-[180px] align-top transition-colors ${
                          isSelected ? 'bg-blue-50' : 'group-hover:bg-gray-50'
                        }`}>
                          {priceData ? (
                            <div className="space-y-1">
                              <div className="font-semibold text-gray-900 text-lg">
                                {priceData.product_url ? (
                                  <a
                                    href={priceData.product_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600"
                                    onClick={(e) => e.stopPropagation()}
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
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile "Show Baskets" button */}
        {hasSelection && (
          <div className="md:hidden fixed bottom-20 left-0 right-0 p-4 bg-white border-t shadow-lg">
            <button
              onClick={() => setShowMobileBasket(true)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium"
            >
              Show Baskets ({selectedPeptides.size} selected)
            </button>
          </div>
        )}
      </div>

      {/* Desktop Basket Panel */}
      <div className={`hidden md:block fixed right-0 top-24 bottom-0 w-80 bg-white border-l shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out ${hasSelection ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-t-lg">
          <h2 className="font-bold text-lg">Best Baskets</h2>
          <button
            onClick={() => setSelectedPeptides(new Set())}
            className="text-gray-300 hover:text-white text-sm"
          >
            Clear all
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-4">{selectedPeptides.size} peptide{selectedPeptides.size > 1 ? 's' : ''} selected</p>

        <div className="space-y-4">
          {baskets.map((basket, idx) => (
            <div key={basket.reseller.id} className={`border rounded-lg p-4 ${idx === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {idx === 0 && <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">Best</span>}
                <span className="font-semibold">{basket.reseller.name}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-3">
                {formatPrice(basket.total)}
              </div>
              <div className="space-y-1 text-sm">
                {basket.items.map(({ peptide, price }) => (
                  <div key={peptide.id} className="flex justify-between text-gray-600">
                    <span>{peptide.name}</span>
                    <span>{formatPrice(price.price_cents)}</span>
                  </div>
                ))}
              </div>
              {basket.missingPeptides.length > 0 && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-xs text-red-600">
                    Missing: {basket.missingPeptides.map(p => p.name).join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
          {baskets.length === 0 && (
            <p className="text-gray-500 text-sm">No prices available for selected peptides.</p>
          )}
        </div>
        </div>
      </div>

      {/* Mobile Basket Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${showMobileBasket ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowMobileBasket(false)}
      >
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${showMobileBasket ? 'opacity-100' : 'opacity-0'}`} />
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto transition-transform duration-300 ease-out ${showMobileBasket ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gray-800 text-white p-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="font-bold text-lg">Best Baskets</h2>
            <button onClick={() => setShowMobileBasket(false)} className="text-gray-300 hover:text-white">
              <CloseIcon />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-4">{selectedPeptides.size} peptide{selectedPeptides.size > 1 ? 's' : ''} selected</p>
            <div className="space-y-4">
              {baskets.map((basket, idx) => (
                <div key={basket.reseller.id} className={`border rounded-lg p-4 ${idx === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {idx === 0 && <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">Best</span>}
                    <span className="font-semibold">{basket.reseller.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-3">
                    {formatPrice(basket.total)}
                  </div>
                  <div className="space-y-1 text-sm">
                    {basket.items.map(({ peptide, price }) => (
                      <div key={peptide.id} className="flex justify-between text-gray-600">
                        <span>{peptide.name}</span>
                        <span>{formatPrice(price.price_cents)}</span>
                      </div>
                    ))}
                  </div>
                  {basket.missingPeptides.length > 0 && (
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-xs text-red-600">
                        Missing: {basket.missingPeptides.map(p => p.name).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setSelectedPeptides(new Set())
                setShowMobileBasket(false)
              }}
              className="w-full mt-4 py-3 text-red-600 font-medium"
            >
              Clear Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
