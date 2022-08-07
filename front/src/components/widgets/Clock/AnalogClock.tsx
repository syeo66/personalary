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

  const isDark = config.style === 'dark'

  return (
    <Clock>
      <Background dark={isDark}>
        <Hours time={time} dark={isDark} />
        <Minutes time={time} dark={isDark} />
        <Seconds time={time} dark={isDark} />
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

interface BackgroundProps {
  dark?: boolean
}

const Background = styled.div<BackgroundProps>`
  background-color: ${({ dark }) => (dark ? '#000' : '#fff')};
  border-radius: 50%;
  border: ${({ dark }) => (dark ? '#eee' : '#000')} 1px solid;
  height: 100px;
  margin-bottom: 0.5rem;
  position: relative;
  width: 100px;
`

interface DateProps {
  dark?: boolean
  time: Date
}

const Hours = styled.div<DateProps>`
  background-color: ${({ dark }) => (dark ? '#aaa' : '#000')};
  border-radius: 2.5px;
  height: 30px;
  left: calc(50% - 2.5px);
  position: absolute;
  top: 25px;
  transform-origin: center calc(100% - 5px);
  transform: rotateZ(${({ time }) => ((time.getHours() % 12) * 60 + time.getMinutes()) * 0.5}deg);
  width: 5px;
`

const Minutes = styled.div<DateProps>`
  background-color: ${({ dark }) => (dark ? '#aaa' : '#000')};
  border-radius: 2.5px;
  height: 45px;
  left: calc(50% - 2.5px);
  position: absolute;
  top: 10px;
  transform-origin: center calc(100% - 5px);
  transform: rotateZ(${({ time }) => ((time.getMinutes() * 60 + time.getSeconds()) / 60) * 6}deg);
  width: 5px;
`

const Seconds = styled.div<DateProps>`
  background-color: red;
  height: 50px;
  left: calc(50% - 0.5px);
  position: absolute;
  top: 5px;
  transform-origin: center calc(100% - 5px);
  transform: rotateZ(${({ time }) => (time.getSeconds() + 1) * 6}deg);
  width: 1px;
`

const DateView = styled.div`
  font-size: 1rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);
`

export default memo(AnalogClock)
