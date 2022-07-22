import React, { PropsWithChildren, useEffect, useState } from 'react'
import styled from 'styled-components'

import useWebsocket from '../hooks/useWebsocket'

const Background: React.FC<PropsWithChildren> = ({ children }) => {
  const [current, setCurrent] = useState('')

  const ws = useWebsocket()

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (!event.data.startsWith('SetBackground')) {
        return
      }

      const [, background] = event.data.split(' ')

      const img = new Image()
      img.src = background
      img.onload = () => setCurrent(background)
    }

    ws?.addEventListener('message', messageHandler)

    return () => ws?.removeEventListener('message', messageHandler)
  }, [ws])

  return <BackgroundRenderer url={current}>{children}</BackgroundRenderer>
}

interface BackgroundRendererProps {
  url: string
}

const BackgroundRenderer = styled.div<BackgroundRendererProps>`
  background: black ${({ url }) => (url ? `url(${url})` : '')} no-repeat center center;
  background-size: cover;
  height: 100%;
  width: 100%;
`

export default Background
