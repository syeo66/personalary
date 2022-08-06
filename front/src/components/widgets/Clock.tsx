import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import useWsMessage from '../../hooks/useWsMessage'

interface ClockConfig {
  dateFormat: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  timeFormat: string
  enabled?: boolean
}

const Clock = () => {
  const [time, setTime] = useState(() => new Date())
  const [config, setConfig] = useState<ClockConfig>({
    dateFormat: 'E, dd.MM.yyyy',
    position: 'bottom-right',
    timeFormat: 'HH:mm',
  })

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const [vertical, horizontal] = config.position.split('-')

  if (!(config.enabled ?? true)) {
    return null
  }

  return (
    <ClockWrapper horizontal={horizontal} vertical={vertical}>
      <Time>{format(time, config.timeFormat)}</Time>
      <DateView>{format(time, config.dateFormat)}</DateView>
    </ClockWrapper>
  )
}

interface ClockWrapperProps {
  vertical?: 'top' | 'bottom' | string
  horizontal?: 'left' | 'right' | string
}

const ClockWrapper = styled.div<ClockWrapperProps>`
  color: white;
  position: absolute;
  ${({ horizontal = 'right' }) => horizontal}: clamp(2rem, 10vw, 5rem);
  ${({ vertical = 'bottom' }) => vertical}: clamp(2rem, 10vw, 5rem);
  margin: 0;
  padding: 0;
`

const Time = styled.div`
  font-size: 4rem;
  display: flex;
  justify-content: flex-start;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);
`

const DateView = styled.div`
  font-size: 1.5rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);
`

export default Clock
