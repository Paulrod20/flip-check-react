import { useState, useRef } from 'react'
import SearchBar from '../components/SearchBar'
import ResultCard from '../components/ResultCard'
import { resolvePlatform } from '../data/platforms'
import { resolveGame } from '../data/games'
import { API_BASE_URL } from '../lib/api'

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
  const [validationError, setValidationError] = useState<string | null>(null)

  const activeControllerRef = useRef<AbortController | null>(null)
  const latestRequestIdRef = useRef(0)

  const handleSearch = async () => {
    const q = query.trim()
    if (q.length < 3) {
      setValidationError('Enter at least 3 characters to search.')
      setHasSearched(false)
      setResults([])
      return
    }

    const platform = resolvePlatform(q)
    const game = resolveGame(q)
    const searchQuery = platform ?? game?.title ?? q
    const platformFilter = platform ? undefined : game?.platform

    if (activeControllerRef.current) {
      activeControllerRef.current.abort()
    }

    const controller = new AbortController()
    activeControllerRef.current = controller

    const requestId = latestRequestIdRef.current + 1
    latestRequestIdRef.current = requestId

    setValidationError(null)
    setIsLoading(true)
    setHasSearched(false)
    setResults([])

    try {
      const url = new URL(`${API_BASE_URL}/search`)
      url.searchParams.set('query', searchQuery)
      if (platformFilter) {
        url.searchParams.set('platform', platformFilter)
      }

      const response = await fetch(url.toString(), { signal: controller.signal })
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        const detail = typeof data?.detail === 'string'
          ? data.detail
          : 'Search failed. Check that the backend is running and eBay credentials are set.'
        throw new Error(detail)
      }

      if (requestId !== latestRequestIdRef.current) return

      setResults(Array.isArray(data) ? data : data?.results || [])
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') return
      if (requestId !== latestRequestIdRef.current) return
      console.error('Search failed:', error)
      setValidationError(
        error instanceof Error ? error.message : 'Search failed. Please try again.'
      )
    } finally {
      if (requestId === latestRequestIdRef.current) {
        setHasSearched(true)
        setIsLoading(false)
      }
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
        setQuery={(value) => {
          setQuery(value)
          setValidationError(null)
        }}
        onSearch={handleSearch}
      />

      {validationError && (
        <div className="w-full max-w-xl px-4 mt-8 text-center">
          <p className="text-lg font-medium"
            style={{ color: 'var(--color-white)' }}>
            {validationError}
          </p>
        </div>
      )}

      {isLoading && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-4 border-white border-t-transparent animate-spin" />
          <p className="text-sm" style={{ color: 'var(--color-white)' }}>
            Searching...
          </p>
        </div>
      )}

      {hasSearched && !isLoading && !validationError && results.length === 0 && (
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
