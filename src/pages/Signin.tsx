import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import '../styles/Signin.css'

function Signin() {
  const [searchParams] = useSearchParams()
  const [isActive, setIsActive] = useState(searchParams.get('tab') === 'register')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err: unknown) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await signUp(name, email, password)
      navigate('/')
    } catch (err: unknown) {
      setError('Could not create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="signin-page">

      <Link to="/" className="signin-logo-link">
        <span>FlipCheck</span>
        <span style={{ position: 'relative', top: '1px' }}>🎮</span>
      </Link>

      <div className={`container ${isActive ? 'active' : ''}`}>

        {/* Sign In Form */}
        <div className="form-box login">
          <form onSubmit={handleSignin}>
            <h1>Sign In</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-link">
              <a href="#">Forgot password?</a>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <form onSubmit={handleSignUp}>
            <h1>Register</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Register'}
            </button>
          </form>
        </div>

        {/* Toggle Box */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Don't have an account?</p>
            <button className="toggle-btn" onClick={() => {
              setIsActive(true)
              setError('')
            }}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome to FlipCheck!</h1>
            <p>Already have an account?</p>
            <button className="toggle-btn" onClick={() => {
              setIsActive(false)
              setError('')
            }}>
              Sign In
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signin