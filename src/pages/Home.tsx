import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ResultCard from '../components/ResultCard'
import { mockResults } from '../data/mockResults'
import type { GameResult } from '../data/mockResults'

function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GameResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return 
    setIsLoading(true)
    setHasSearched(false)
    setResults([])

    // Simulating API call delay - replace with real API call later
    await new Promise(resolve => setTimeout(resolve, 800))

    const normalizedQuery = query.trim().toLowerCase()
    const filtered = mockResults.filter(game =>
      game.title.toLowerCase().startsWith(normalizedQuery)
    )
    setResults(filtered)
    setHasSearched(true)
    setIsLoading(false)
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
          {results.map(game => (
            <ResultCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home