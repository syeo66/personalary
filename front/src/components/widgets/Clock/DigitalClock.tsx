import { format } from 'date-fns'
import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'

import { DigitalClockConfigType } from './ClockType'

interface DigitalClockProps {
  config: DigitalClockConfigType
}

const DigitalClock: React.FC<DigitalClockProps> = ({ config }) => {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const align = config.position.includes('right') ? 'right' : 'left'

  return (
    <>
      <Time align={align}>{format(time, config.timeFormat)}</Time>
      <DateView align={align}>{format(time, config.dateFormat)}</DateView>
    </>
  )
}

interface Props {
  align?: 'left' | 'right'
}

const Time = styled.div<Props>`
  display: flex;
  font-size: 4rem;
  justify-content: ${({ align }) => (align === 'right' ? 'flex-end' : 'flex-start')};
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);
`

const DateView = styled.div<Props>`
  display: flex;
  font-size: 1.5rem;
  justify-content: ${({ align }) => (align === 'right' ? 'flex-end' : 'flex-start')};
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);
`

export default memo(DigitalClock)
