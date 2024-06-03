import React from 'react'
import StartPage from './components/StartPage/StartPage'
import MainMap from './components/MainMap/MainMap'
import TurnOn from './components/TurneOnLocation/TurnOn'

const App = () => {
  return (
    <div>
      <StartPage/>
      {/* <TurnOn/> */}
      <MainMap/>
    </div>
  )
}

export default App