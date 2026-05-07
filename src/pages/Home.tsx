function Home() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: 'var(--color-background)' }}>
        
        <h1 className="text-6xl font-bold mb-8 tracking-tight"
          style={{ color: 'var(--color-white)' }}>
          FlipCheck 🎮
        </h1>
  
        <div className="w-full max-w-xl px-4 flex ">
          <input
            type="text"
            placeholder="Search for a game or console..."
            className="w-full px-6 py-4 rounded-l-full text-lg outline-none shadow-md"
            style={{
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-text)',
            }}
          />
          <button
            className="px-6 py-4 rounded-r-full font-semibold shadow-md search-btn"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
            }}>
            Search
          </button>
        </div>
  
      </div>
    )
  }
  
export default Home
