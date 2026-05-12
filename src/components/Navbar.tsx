import { useState } from 'react'
import { useAuth } from '../context/auth-context'

function Navbar() {
  const { user, signOut } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 px-8 py-4 flex items-center justify-between"
      style={{ backgroundColor: 'var(--color-background)' }}>

      {/* Logo */}
      <div
        className="text-xl font-bold cursor-pointer"
        style={{ color: 'var(--color-white)' }}>
        FlipCheck 🎮
      </div>

      {/* Nav Links + Profile grouped together on the right */}
      <div className="flex items-center gap-8">
        {['Platforms', 'Games', 'About', 'Donate'].map(link => (
          <span
            key={link}
            className="cursor-pointer text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-white)' }}>
            {link}
          </span>
        ))}

        {/* Profile Circle */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-white)',
            }}>
            {user ? user.email?.[0].toUpperCase() : '?'}
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg overflow-hidden"
              style={{ backgroundColor: 'var(--color-white)' }}>
              {user ? (
                <>
                  <div
                    className="px-4 py-2 text-xs truncate"
                    style={{ color: 'var(--color-secondary)' }}>
                    {user.email}
                  </div>
                  <button
                    onClick={signOut}
                    className="w-full text-left px-4 py-2 text-sm hover:opacity-70"
                    style={{ color: 'var(--color-text)' }}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:opacity-70"
                    style={{ color: 'var(--color-text)' }}>
                    Login
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:opacity-70"
                    style={{ color: 'var(--color-text)' }}>
                    Sign Up
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar