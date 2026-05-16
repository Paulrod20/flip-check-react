import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Navbar from './components/Navbar'

function Layout() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/signin'

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  )
}

function App() {
  return <Layout />
}

export default App
