import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ResultCard from '../components/ResultCard'
import { mockResults } from '../data/mockResults'
import type { GameResult } from '../data/mockResults'

function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GameResult[]>([])

  const handleSearch = () => {
    const filtered = mockResults.filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--color-background)' }}>

      <h1 className="text-6xl font-bold mb-8 tracking-tight"
        style={{ color: 'var(--color-white)' }}>
        FlipCheck 🎮
      </h1>

      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

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