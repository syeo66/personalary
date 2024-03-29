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

const BackgroundRenderer = styled.div.attrs<BackgroundRendererProps>(({ url }) => {
  return {
    style: { backgroundColor: 'black', ...(url ? { backgroundImage: `url(${url})` } : {}) },
  }
})<BackgroundRendererProps>`
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  bottom: 0;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
`

const Copyright = styled.div`
  bottom: 1rem;
  color: white;
  font-size: 85%;
  left: 1rem;
  position: absolute;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(0, 0, 0, 0.3);
`

export default Background
