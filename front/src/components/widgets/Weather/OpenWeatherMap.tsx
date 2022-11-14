import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import useWsMessage from '../../../hooks/useWsMessage'
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
      <Temperature>{Math.round(config.feels_like * 10) / 10}°C</Temperature>
    </PositionWrapper>
  )
}

const Image = styled.img`
  background: rgba(0, 0, 0, 0.85);
  border-radius: 50%;
  transform: scale(0.8);
`

const Temperature = styled.div`
  font-weight: bold;
  font-size: 2.5rem;
  text-align: right;
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
`

export default OpenWeatherMap
