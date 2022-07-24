import React, { createContext, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export const WebsocketContext = createContext<WebSocket | null>(null)

const WebsocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [ws, setWs] = useState<WebSocket | null>(null)

  const timeout = useRef(1)
  const isConnecting = useRef(false)

  const connect = useCallback(() => {
    if (isConnecting.current) {
      return
    }

    isConnecting.current = true
    const socket = new WebSocket(process.env.REACT_APP_WS_URL || `ws://${document.location.host}`)

    socket.onopen = () => {
      setWs(socket)
      timeout.current = 1
      setIsConnected(true)
      isConnecting.current = false
    }

    socket.onclose = () => {
      setIsConnected(false)
      setTimeout(connect, Math.min(timeout.current++, 20) * 1000)
      isConnecting.current = false
    }

    socket.onerror = () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      connect()
    }
  }, [connect, ws])

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
