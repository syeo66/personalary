import React, { PropsWithChildren, useCallback, useState } from 'react'
import styled from 'styled-components'

import useWsMessage from '../hooks/useWsMessage'

const Background: React.FC<PropsWithChildren> = ({ children }) => {
  const [current, setCurrent] = useState('')

  const handleMesssage = useCallback((event: MessageEvent) => {
    const [, background] = event.data.split(' ')

    const img = new Image()
    img.src = background
    img.onload = () => setCurrent(background)
  }, [])

  useWsMessage('SetBackground', handleMesssage)

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
