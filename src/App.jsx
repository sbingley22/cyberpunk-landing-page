import { useEffect, useState } from 'react'
import './App.css'
import Game from './component/Game'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handleResize = () => {
      setIsMobile(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleResize)

    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }, [])

  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState(1)

  return (
    <>
      { mode == 1 && <Game isMobile={isMobile} /> }
    </>
  )
}

export default App
