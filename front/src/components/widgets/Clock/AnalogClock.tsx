import { format } from 'date-fns'
import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AnalogClockConfigType } from './ClockType'

const TIMER_PRECISION = 250

interface AnalogClockProps {
  config: AnalogClockConfigType
}

const AnalogClock: React.FC<AnalogClockProps> = ({ config }) => {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      if (Math.floor(time.getTime() / 1000) !== Math.floor(now.getTime() / 1000)) {
        setTime(now)
      }
    }, TIMER_PRECISION)

    return () => clearInterval(interval)
  }, [time])

  return (
    <Clock>
      <Background>
        <Hours time={time} />
        <Minutes time={time} />
        <Seconds time={time} />
      </Background>
      <DateView>{format(time, config.dateFormat)}</DateView>
    </Clock>
  )
}

const Clock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Background = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  border: black 1px solid;
  border-radius: 50%;
  position: relative;
  margin-bottom: 0.5rem;
`

interface DateProps {
  time: Date
}

const Hours = styled.div<DateProps>`
  background-color: black;
  width: 5px;
  height: 30px;
  left: calc(50% - 2.5px);
  top: 25px;
  position: absolute;
  transform-origin: center calc(100% - 5px);
  border-radius: 2.5px;
  transform: rotateZ(${({ time }) => ((time.getHours() % 12) * 60 + time.getMinutes()) * 0.5}deg);
`

const Minutes = styled.div<DateProps>`
  background-color: black;
  border-radius: 2.5px;
  width: 5px;
  height: 45px;
  left: calc(50% - 2.5px);
  top: 10px;
  position: absolute;
  transform-origin: center calc(100% - 5px);
  transform: rotateZ(${({ time }) => ((time.getMinutes() * 60 + time.getSeconds()) / 60) * 6}deg);
`

const Seconds = styled.div<DateProps>`
  background-color: red;
  width: 1px;
  height: 50px;
  left: calc(50% - 0.5px);
  top: 5px;
  position: absolute;
  transform-origin: center calc(100% - 5px);
  transform: rotateZ(${({ time }) => (time.getSeconds() + 1) * 6}deg);
`

const DateView = styled.div`
  font-size: 1rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);
`

export default memo(AnalogClock)
