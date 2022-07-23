import { parseISO } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import useWsMessage from '../../hooks/useWsMessage'

interface MessageData {
  fromDate: string
  message: string
  toDate: string
}

const Message = () => {
  const [current, setCurrent] = useState<MessageData | null>(null)

  const messageHandler = useCallback((event: MessageEvent) => {
    try {
      const value = JSON.parse(event.data?.replace('ShowMessage ', ''))
      setCurrent(value as MessageData)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('could not parse message', event.data, error)
    }
  }, [])

  useWsMessage('ShowMessage', messageHandler)

  useEffect(() => {
    const interval = setInterval(() => {
      if (current?.toDate && parseISO(current.toDate) < new Date()) {
        setCurrent(null)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [current?.toDate])

  if (!current || parseISO(current.toDate) < new Date()) {
    return null
  }

  return (
    <MessageContainer>
      <MessageRenderer>{current?.message}</MessageRenderer>
    </MessageContainer>
  )
}

const MessageContainer = styled.div`
  align-items: center;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 2;
`

const MessageRenderer = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4), 0 0 5px rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 80%;
  color: white;
  font-size: 2rem;
  padding: 2rem;
  border: 1px solid white;
  border-radius: 0.5rem;
`

export default Message
