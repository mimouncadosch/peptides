import Link from 'next/link'

export default function LearnPage() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learn about Peptides</h1>
            <p className="text-gray-600 mt-1">Educational resource on peptide research</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Price Comparison
          </Link>
        </div>
      </header>

      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-6 rounded-lg">
        <p className="font-medium">Coming Soon</p>
        <p className="text-sm mt-1">
          The peptide encyclopedia from the previous version will be migrated here.
        </p>
      </div>
    </div>
  )
}
