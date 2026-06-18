import { useState } from 'react'
import { platforms } from '../data/platforms'
import { games } from '../data/games'

interface SearchBarProps {
  query: string
  setQuery: (value: string) => void
  onSearch: () => void
}

type Suggestion = {
  label: string
  type: 'Platform' | 'Game'
}

function rankSuggestion(label: string, normalizedQuery: string): number {
  const lower = label.toLowerCase()
  if (lower.startsWith(normalizedQuery)) return 0
  if (lower.includes(normalizedQuery)) return 1
  return 2
}

function SearchBar({ query, setQuery, onSearch }: SearchBarProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const normalizedQuery = query.trim().toLowerCase()

  const suggestions: Suggestion[] = [
    ...platforms
      .filter(p => p.toLowerCase().includes(normalizedQuery))
      .map(p => ({ label: p, type: 'Platform' as const })),
    ...games
      .filter(g => g.title.toLowerCase().includes(normalizedQuery))
      .map(g => ({ label: g.title, type: 'Game' as const })),
  ]
    .sort((a, b) => {
      const rankDiff = rankSuggestion(a.label, normalizedQuery) - rankSuggestion(b.label, normalizedQuery)
      if (rankDiff !== 0) return rankDiff
      return a.label.localeCompare(b.label)
    })
    .slice(0, 8)

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
          {suggestions.map((suggestion) => (
            <div
              key={`${suggestion.type}-${suggestion.label}`}
              className="flex items-center justify-between px-6 py-3 cursor-pointer hover:opacity-80"
              style={{ backgroundColor: 'var(--color-white)' }}
              onMouseDown={() => handleSelect(suggestion.label)}>
              <span style={{ color: 'var(--color-text)' }}>{suggestion.label}</span>
              <span className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: suggestion.type === 'Platform'
                    ? 'var(--color-secondary)'
                    : 'var(--color-highlight)',
                  color: 'var(--color-text)',
                }}>
                {suggestion.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
