import React, { createContext, PropsWithChildren, useState } from 'react'
import styled from 'styled-components'

const ws = new WebSocket('ws://localhost:8080')
export const WebsocketContext = createContext(ws)

const WebsocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)

  ws.onopen = () => setIsConnected(true)
  ws.onclose = () => setIsConnected(false)

  return (
    <WebsocketContext.Provider value={ws}>
      {!isConnected && <Disconnected>Server is not connected.</Disconnected>}
      {children}
    </WebsocketContext.Provider>
  )
}

const Disconnected = styled.div`
  background: red;
  color: white;
  font-weight: bold;
  padding: 1rem;
  position: fixed;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 2000;
`

export default WebsocketProvider
