import { useState } from 'react'
import SearchBar from '../components/SearchBar'

function Home() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    console.log('Searching for:', query)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--color-background)' }}>

      <h1 className="text-6xl font-bold mb-8 tracking-tight"
        style={{ color: 'var(--color-white)' }}>
        FlipCheck 🎮
      </h1>

      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

    </div>
  )
}

export default Home