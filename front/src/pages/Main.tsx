import React from 'react'

import Background from '../components/Background'
import Screen from '../components/Screen'
import Clock from '../components/widgets/Clock'
import Message from '../components/widgets/Message'
import MusicPlayer from '../components/widgets/MusicPlayer'
import Weather from '../components/widgets/Weather'
import WebsocketProvider from '../providers/WebsocketProvider'

const Main: React.FC = () => (
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

export default Main
