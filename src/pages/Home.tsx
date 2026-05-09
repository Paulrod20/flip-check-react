import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ResultCard from '../components/ResultCard'
import { mockResults } from '../data/mockResults'
import type { GameResult } from '../data/mockResults'

function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GameResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = mockResults.filter(game =>
      game.title.toLowerCase().startsWith(normalizedQuery)
    )
    setResults(filtered)
    setHasSearched(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--color-background)' }}>

      <h1 className="text-6xl font-bold mb-8 tracking-tight"
        style={{ color: 'var(--color-white)' }}>
        FlipCheck 🎮
      </h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        games={mockResults}
      />
      {hasSearched && results.length === 0 && (
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

      {results.length > 0 && (
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