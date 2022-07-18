import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Background from './components/Background'
import Screen from './components/Screen'
import Clock from './components/widgets/Clock'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Screen>
        <Background>
          <Clock />
        </Background>
      </Screen>
    </QueryClientProvider>
  )
}

export default App
