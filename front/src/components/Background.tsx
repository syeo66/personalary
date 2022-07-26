import React, { PropsWithChildren, useCallback, useState } from 'react'
import styled from 'styled-components'

import useWsMessage from '../hooks/useWsMessage'

interface BackgroundData {
  credits?: string
  url: string
}

const Background: React.FC<PropsWithChildren> = ({ children }) => {
  const [current, setCurrent] = useState<BackgroundData | null>(null)

  const handleMesssage = useCallback((event: MessageEvent<string>) => {
    const raw = event.data.replace('SetBackground ', '')
    try {
      const background: BackgroundData = JSON.parse(raw)
      const img = new Image()
      img.src = background.url
      img.onload = () => setCurrent(background)
    } catch {
      // do nothing
    }
  }, [])

  useWsMessage('SetBackground', handleMesssage)

  return (
    <BackgroundRenderer url={current?.url}>
      {children}
      {current?.credits && <Copyright>&copy; {current?.credits}</Copyright>}
    </BackgroundRenderer>
  )
}

interface BackgroundRendererProps {
  url?: string
}

const BackgroundRenderer = styled.div<BackgroundRendererProps>`
  background: black ${({ url }) => (url ? `url(${url})` : '')} no-repeat center center;
  background-size: cover;
  height: 100%;
  width: 100%;
`

const Copyright = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;
  font-size: 85%;
`

export default Background
