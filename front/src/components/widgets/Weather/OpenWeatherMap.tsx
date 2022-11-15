import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import useWsMessage from '../../../hooks/useWsMessage'
import Temperature from '../../icons/Temperature'
import PositionWrapper from '../../PositionWrapper'
import type { WeatherDataType } from './WeatherData'

const OpenWeatherMap: React.FC = () => {
  const [config, setConfig] = useState<WeatherDataType>({ enabled: false })

  const messageHandler = useCallback((event: MessageEvent) => {
    try {
      const value = JSON.parse(event.data?.replace('SetWeather ', ''))
      setConfig(value)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('could not parse message', event.data, error)
    }
  }, [])

  useWsMessage('SetWeather', messageHandler)

  console.log(config)

  if (!config?.enabled) {
    return null
  }

  const [vertical, horizontal] = config.position.split('-')

  return (
    <PositionWrapper vertical={vertical} horizontal={horizontal}>
      <Image src={`https://openweathermap.org/img/wn/${config.icon}@4x.png`} alt={config.description} />
      <Weather>
        <Description>{config.description}</Description>
        <Temp>
          {Math.round(config.feels_like * 10) / 10}
          <Temperature />
        </Temp>
      </Weather>
    </PositionWrapper>
  )
}

const Image = styled.img`
  background: rgba(0, 0, 0, 0.85);
  border-radius: 50%;
  transform: scale(0.8);
`

const Weather = styled.div`
  bottom: 0;
  font-size: 2.5rem;
  font-weight: bold;
  position: absolute;
  right: 0;
  text-align: right;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 0, 0, 0.3);
  width: 100%;
`
const Temp = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const Description = styled.div`
  font-size: 1rem;
`

export default OpenWeatherMap
