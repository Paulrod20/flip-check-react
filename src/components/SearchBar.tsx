
interface SearchBarProps { 
    query: string
    setQuery: (value: string) => void
    onSearch: () => void
}

function SearchBar({ query, setQuery, onSearch }: SearchBarProps) { 
    return (
        <div className="w-full max-w-xl px-4 flex search-bar">
            <input
                type="text"
                placeholder="Search for a game or console..."
                className="w-full px-6 py-4 rounded-l-full text-lg outline-none shadow-md"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    backgroundColor: 'var(--color-white)',
                    color: 'var(--color-text)',
                }}
            />
            <button
                className="px-6 py-4 rounded-r-full font-semibold shadow-md search-btn"
                onClick={onSearch}
                style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)',
                }}>
                Search
            </button>
        </div>
    );
}

export default SearchBar