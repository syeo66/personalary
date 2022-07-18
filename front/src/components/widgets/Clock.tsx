import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Clock = () => {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ClockWrapper>
      <Time>{format(time, 'HH:mm')}</Time>
      <DateView>{format(time, 'E, dd.MM.yyyy')}</DateView>
    </ClockWrapper>
  )
}

const ClockWrapper = styled.div`
  color: white;
  position: absolute;
  right: clamp(2rem, 10vw, 5rem);
  bottom: clamp(2rem, 10vw, 5rem);
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
