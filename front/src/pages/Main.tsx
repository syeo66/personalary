import React, { useEffect } from 'react'

import Background from '../components/Background'
import Screen from '../components/Screen'
import Clock from '../components/widgets/Clock'
import Message from '../components/widgets/Message'
import MusicPlayer from '../components/widgets/MusicPlayer'
import Weather from '../components/widgets/Weather'
import WebsocketProvider from '../providers/WebsocketProvider'

const DAY = 60 * 60 * 24 * 1000

const Main: React.FC = () => {
  useEffect(() => {
    // reload page after a random time between 1 and 2 days
    // this should prevent memory issues because of long running times
    const timeout = setTimeout(() => document.location.reload(), DAY + Math.trunc(Math.random() * DAY))

    return () => clearTimeout(timeout)
  }, [])

  return (
    <WebsocketProvider>
      <Screen>
        <Background>
          <Clock />
          <Message />
          <MusicPlayer />
          <Weather />
        </Background>
      </Screen>
    </WebsocketProvider>
  )
}

export default Main
