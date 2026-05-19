import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.user_metadata?.full_name || '')
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage('')
    try {
      // We'll wire this to Supabase later
      await new Promise(resolve => setTimeout(resolve, 800))
      setSaveMessage('Profile updated!')
    } catch {
      setSaveMessage('Something went wrong.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const initial = user?.user_metadata?.full_name?.[0].toUpperCase() 
    || user?.email?.[0].toUpperCase() 
    || '?'

  return (
    <div
      className="min-h-screen flex flex-col items-center py-32 px-4"
      style={{ backgroundColor: 'var(--color-background)' }}>

      {/* Avatar */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold mb-6"
        style={{
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-white)',
        }}>
        {initial}
      </div>

      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-md"
        style={{ backgroundColor: 'var(--color-white)' }}>

        {/* Name */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: 'var(--color-text)' }}>
            Display Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              backgroundColor: '#eee',
              color: 'var(--color-text)',
            }}
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: 'var(--color-text)' }}>
            Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-3 rounded-xl text-sm outline-none opacity-60"
            style={{
              backgroundColor: '#eee',
              color: 'var(--color-text)',
            }}
          />
        </div>

        {/* Email Notifications */}
        <div className="mb-6 flex items-center gap-3">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
            style={{ accentColor: 'var(--color-primary)' }}
          />
          <label
            htmlFor="emailNotifications"
            className="text-sm cursor-pointer"
            style={{ color: 'var(--color-text)' }}>
            Email notifications for price drops
          </label>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <p className="text-sm mb-4 text-center"
            style={{ color: 'var(--color-primary)' }}>
            {saveMessage}
          </p>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-3 rounded-xl text-sm font-semibold mb-3"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
          }}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>

        {/* Change Password */}
        <button
          className="w-full py-3 rounded-xl text-sm font-semibold mb-3"
          style={{
            backgroundColor: 'var(--color-highlight)',
            color: 'var(--color-text)',
          }}>
          Change Password
        </button>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="w-full py-3 rounded-xl text-sm font-semibold"
          style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
          }}>
          Sign Out
        </button>

      </div>
    </div>
  )
}

export default Profile