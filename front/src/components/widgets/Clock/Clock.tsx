import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
import styled from 'styled-components'

import useWsMessage from '../../../hooks/useWsMessage'
import { ClockConfigType } from './ClockType'

const DigitalClock = lazy(() => import('./DigitalClock'))
const AnalogClock = lazy(() => import('./AnalogClock'))

const Clock: React.FC = () => {
  const [config, setConfig] = useState<ClockConfigType | null>(null)

  const messageHandler = useCallback((event: MessageEvent) => {
    try {
      const value = JSON.parse(event.data?.replace('SetClockConfig ', ''))
      setConfig(value)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('could not parse message', event.data, error)
    }
  }, [])

  useWsMessage('SetClockConfig', messageHandler)

  if (!config?.enabled) {
    return null
  }

  const [vertical, horizontal] = config.position.split('-')

  return (
    <Suspense>
      <ClockWrapper vertical={vertical} horizontal={horizontal}>
        {config?.type === 'digital' && <DigitalClock config={config} />}
        {config?.type === 'analog' && <AnalogClock config={config} />}
      </ClockWrapper>
    </Suspense>
  )
}

interface ClockWrapperProps {
  vertical?: 'top' | 'bottom' | string
  horizontal?: 'left' | 'right' | string
}

const ClockWrapper = styled.div<ClockWrapperProps>`
  color: white;
  position: absolute;
  margin: 0;
  box-sizing: border-box;
  padding: 0;
  ${({ horizontal = 'left' }) => (horizontal === 'right' ? 'right' : 'left')}: clamp(2rem, 10vw, 5rem);
  ${({ vertical = 'top' }) => (vertical === 'bottom' ? 'bottom' : 'top')}: clamp(2rem, 10vw, 5rem);
  ${({ horizontal }) =>
    horizontal === 'center' &&
    `
    left: 50vw;
    transform: translateX(-50%);
  `}
  ${({ vertical }) =>
    vertical === 'center' &&
    `
    top: 50vh;
    transform: translateY(-50%);
  `}
`

export default memo(Clock)
