import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Background from './components/Background'
import Screen from './components/Screen'
import Clock from './components/widgets/Clock'
import Message from './components/widgets/Message'
import WebsocketProvider from './providers/WebsocketProvider'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WebsocketProvider>
        <Screen>
          <Background>
            <Message />
            <Clock />
          </Background>
        </Screen>
      </WebsocketProvider>
    </QueryClientProvider>
  )
}

export default App
