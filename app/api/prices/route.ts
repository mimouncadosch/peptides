import { NextResponse } from 'next/server'
import { getLatestPrices, getPeptides, getResellers } from '@/lib/db'

export async function GET() {
  try {
    const [peptides, resellers, prices] = await Promise.all([
      getPeptides(),
      getResellers(),
      getLatestPrices(),
    ])

    return NextResponse.json({
      peptides,
      resellers,
      prices,
    })
  } catch (error) {
    console.error('Failed to fetch prices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    )
  }
}
