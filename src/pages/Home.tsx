import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ResultCard from '../components/ResultCard'
import { mockResults } from '../data/mockResults'

export interface EbayListing {
  source: string
  title: string
  price: number
  condition: string
  url: string
  image: string
}

function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<EbayListing[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return 

    setIsLoading(true)
    setHasSearched(false)
    setResults([])

    try {
      const response = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(query)}`)
      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setHasSearched(true)
      setIsLoading(false)
    }

  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24"
      style={{ backgroundColor: 'var(--color-background)' }}>

      <h1 className="text-6xl font-bold mb-8 tracking-tight"
        style={{ color: 'var(--color-white)' }}>
        How much is it worth?
      </h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        games={mockResults}
      />

      {isLoading && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-4 border-white border-t-transparent animate-spin" />
          <p className="text-sm" style={{ color: 'var(--color-white)' }}>
            Searching...
          </p>
        </div>
      )}

      {hasSearched && !isLoading && results.length === 0 && (
        <div className="w-full max-w-xl px-4 mt-8 text-center">
          <p className="text-lg font-medium"
            style={{ color: 'var(--color-white)' }}>
            No results found for "{query}"
          </p>
          <p className="text-sm mt-2"
            style={{ color: 'var(--color-highlight)' }}>
            Try searching for a different game or console.
          </p>
        </div>
      )}

      {results.length > 0 && !isLoading && (
        <div className="w-full max-w-xl px-4 mt-8">
          {results.map((listing, i) => (
            <ResultCard key={i} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home