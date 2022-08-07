import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
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

  return (
    <>
      <Time>{format(time, config.timeFormat)}</Time>
      <DateView>{format(time, config.dateFormat)}</DateView>
    </>
  )
}

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

export default DigitalClock
