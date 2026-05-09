import { useState } from 'react'
import { platforms } from '../data/platforms'
import type { GameResult } from '../data/mockResults'

interface SearchBarProps {
  query: string
  setQuery: (value: string) => void
  onSearch: () => void
  games: GameResult[]
}

function SearchBar({ query, setQuery, onSearch, games }: SearchBarProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const normalizedQuery = query.trim().toLowerCase()

  const filteredPlatforms = platforms.filter(p =>
    p.toLowerCase().startsWith(normalizedQuery)
  )
  
  const filteredGames = games.filter(g =>
    g.title.toLowerCase().startsWith(normalizedQuery)
  )

  const suggestions = [
    ...filteredPlatforms.map(p => ({ label: p, type: 'Platform' })),
    ...filteredGames.map(g => ({ label: g.title, type: 'Game' })),
  ].slice(0, 8)

  const handleSelect = (label: string) => {
    setQuery(label)
    setShowDropdown(false)
    onSearch()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch()
    if (e.key === 'Escape') setShowDropdown(false)
  }

  return (
    <div className="w-full max-w-xl px-4 relative">
      <div className="flex search-bar">
        <input
          type="text"
          placeholder="Search for a game or console..."
          className="w-full px-6 py-4 rounded-l-full text-lg outline-none shadow-md"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowDropdown(e.target.value.length > 0)
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          style={{
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-text)',
          }}
        />
        <button
          onClick={onSearch}
          className="px-6 py-4 rounded-r-full font-semibold shadow-md search-btn"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
          }}>
          Search
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-4 right-4 mt-2 rounded-2xl shadow-lg overflow-hidden z-10"
          style={{ backgroundColor: 'var(--color-white)' }}>
          {suggestions.map((s, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-3 cursor-pointer hover:opacity-80"
              style={{ backgroundColor: 'var(--color-white)' }}
              onMouseDown={() => handleSelect(s.label)}>
              <span style={{ color: 'var(--color-text)' }}>{s.label}</span>
              <span className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: s.type === 'Platform'
                    ? 'var(--color-secondary)'
                    : 'var(--color-highlight)',
                  color: 'var(--color-text)',
                }}>
                {s.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar