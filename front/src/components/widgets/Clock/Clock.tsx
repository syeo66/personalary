import React, { lazy, memo, Suspense, useCallback, useState } from 'react'

import useWsMessage from '../../../hooks/useWsMessage'
import PositionWrapper from '../../PositionWrapper'
import { ClockConfigType } from './ClockType'

const AnalogClock = lazy(() => import('./AnalogClock'))
const SVGClock = lazy(() => import('./SVGClock'))
const BinaryClock = lazy(() => import('./BinaryClock'))
const DigitalClock = lazy(() => import('./DigitalClock'))

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
      <PositionWrapper vertical={vertical} horizontal={horizontal}>
        {config?.type === 'digital' && <DigitalClock config={config} />}
        {config?.type === 'analog' && <SVGClock config={config} />}
        {config?.type === 'binary' && <BinaryClock config={config} />}
      </PositionWrapper>
    </Suspense>
  )
}

export default memo(Clock)
