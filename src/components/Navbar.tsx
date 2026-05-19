import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

function Navbar() {
  const { user, signOut } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 px-8 py-4 flex items-center justify-between"
      style={{ backgroundColor: 'var(--color-background)' }}>

      <div
        className="flex items-center gap-1 text-xl font-bold cursor-pointer self-start"
        onClick={() => navigate('/')}
        style={{ color: 'var(--color-white)' }}>
        <span>FlipCheck</span>
        <span style={{ position: 'relative', top: '1px' }}>🎮</span>
      </div>

      <div className="flex items-center gap-8">
        {['Platforms', 'Games', 'About', 'Donate'].map(link => (
          <span
            key={link}
            className="cursor-pointer text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-white)' }}>
            {link}
          </span>
        ))}

        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-white)',
              }}>
              {user.user_metadata?.full_name?.[0].toUpperCase() || user.email?.[0].toUpperCase()}
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg overflow-hidden"
                style={{ backgroundColor: 'var(--color-white)' }}>
                <button
                  onClick={() => { navigate('/profile'); setDropdownOpen(false) }}
                  className="w-full text-left px-4 py-2 text-sm hover:opacity-70"
                  style={{ color: 'var(--color-text)' }}>
                  Profile
                </button>
                <button
                  onClick={signOut}
                  className="w-full text-left px-4 py-2 text-sm hover:opacity-70"
                  style={{ color: 'var(--color-text)' }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/signin')}
            className="px-5 py-2 rounded-full text-sm font-semibold search-btn"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
            }}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar