import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { BinaryClockConfigType } from './ClockType'

const TIMER_PRECISION = 250

interface BinaryClockProps {
  config: BinaryClockConfigType
}

// eslint-disable-next-line complexity
const BinaryClock: React.FC<BinaryClockProps> = ({ config }) => {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      if (time.getSeconds() !== now.getSeconds()) {
        setTime(now)
      }
    }, TIMER_PRECISION)

    return () => clearInterval(interval)
  }, [time])

  return (
    <>
      <Line>
        <Dot className={time.getHours() & 16 ? 'active' : ''} />
        <Dot className={time.getHours() & 8 ? 'active' : ''} />
        <Dot className={time.getHours() & 4 ? 'active' : ''} />
        <Dot className={time.getHours() & 2 ? 'active' : ''} />
        <Dot className={time.getHours() & 1 ? 'active' : ''} />
      </Line>
      <Line>
        <Dot className={time.getMinutes() & 32 ? 'active' : ''} />
        <Dot className={time.getMinutes() & 16 ? 'active' : ''} />
        <Dot className={time.getMinutes() & 8 ? 'active' : ''} />
        <Dot className={time.getMinutes() & 4 ? 'active' : ''} />
        <Dot className={time.getMinutes() & 2 ? 'active' : ''} />
        <Dot className={time.getMinutes() & 1 ? 'active' : ''} />
      </Line>
      <Line>
        <Dot className={time.getSeconds() & 32 ? 'active' : ''} />
        <Dot className={time.getSeconds() & 16 ? 'active' : ''} />
        <Dot className={time.getSeconds() & 8 ? 'active' : ''} />
        <Dot className={time.getSeconds() & 4 ? 'active' : ''} />
        <Dot className={time.getSeconds() & 2 ? 'active' : ''} />
        <Dot className={time.getSeconds() & 1 ? 'active' : ''} />
      </Line>
      <Line>
        <Legend>32</Legend>
        <Legend>16</Legend>
        <Legend>8</Legend>
        <Legend>4</Legend>
        <Legend>2</Legend>
        <Legend>1</Legend>
      </Line>
      <DateView>{format(time, config.dateFormat)}</DateView>
    </>
  )
}

interface DotProps {
  active?: boolean
}
const Dot = styled.div<DotProps>`
  width: 1rem;
  height: 1rem;
  border: 1px solid white;
  margin: 0.5rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);

  &.active {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid black;
  }
`
const Line = styled.div`
  justify-content: flex-end;
  white-space: nowrap;
  display: flex;
`

const DateView = styled.div`
  font-size: 1rem;
  white-space: nowrap;
  text-align: right;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);
`

const Legend = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0 0.5rem;
  font-size: 60%;
  display: flex;
  justify-content: center;
  border: 1px solid transparent;
`

export default BinaryClock
