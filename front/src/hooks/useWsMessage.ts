import { useEffect } from 'react'

import useWebsocket from './useWebsocket'

export const MessageType = {
  SetBackground: 'SetBackground',
  ShowMessage: 'ShowMessage',
}

const useWsMessage = (type: keyof typeof MessageType, callback: (event: MessageEvent) => void) => {
  const ws = useWebsocket()

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (!event.data.startsWith(type)) {
        return
      }

      callback(event)
    }

    ws?.addEventListener('message', messageHandler)

    return () => ws?.removeEventListener('message', messageHandler)
  }, [callback, type, ws])
}

export default useWsMessage
