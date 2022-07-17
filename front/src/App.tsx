import React from 'react'

import Background from './components/Background'
import Screen from './components/Screen'
import Clock from './components/widgets/Clock'

const App: React.FC = () => {
  return (
    <Screen>
      <Background>
        <Clock />
      </Background>
    </Screen>
  )
}

export default App
