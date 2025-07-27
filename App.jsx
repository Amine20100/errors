import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import Error400 from './pages/Error400'
import Error401 from './pages/Error401'
import Error403 from './pages/Error403'
import Error404 from './pages/Error404'
import Error408 from './pages/Error408'
import Error410 from './pages/Error410'
import Error418 from './pages/Error418'
import Error429 from './pages/Error429'
import Error500 from './pages/Error500'
import Error502 from './pages/Error502'
import Error503 from './pages/Error503'
import Error504 from './pages/Error504'
import Error507 from './pages/Error507'
import Error511 from './pages/Error511'
import './App.css'
import './i18n'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/400" element={<Error400 />} />
        <Route path="/401" element={<Error401 />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/408" element={<Error408 />} />
        <Route path="/410" element={<Error410 />} />
        <Route path="/418" element={<Error418 />} />
        <Route path="/429" element={<Error429 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="/502" element={<Error502 />} />
        <Route path="/503" element={<Error503 />} />
        <Route path="/504" element={<Error504 />} />
        <Route path="/507" element={<Error507 />} />
        <Route path="/511" element={<Error511 />} />
        {/* Catch all other routes and show 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App
