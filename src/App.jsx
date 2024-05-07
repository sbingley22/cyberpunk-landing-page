import { useState } from 'react'
import './App.css'
import Game from './component/Game'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState(1)

  return (
    <>
      { mode == 1 && <Game /> }
    </>
  )
}

export default App
