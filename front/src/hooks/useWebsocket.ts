import { useContext } from 'react'

import { WebsocketContext } from '../providers/WebsocketProvider'

const useWebsocket = () => {
  const ws = useContext(WebsocketContext)
  return ws
}

export default useWebsocket
