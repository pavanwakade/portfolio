import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta name="theme-color" content={darkMode ? '#111827' : '#ffffff'} />
      </Helmet>
      
      <div className={`${darkMode ? 'dark' : ''} overflow-x-hidden`}>
        <div className="overflow-x-hidden text-gray-900 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-white">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
