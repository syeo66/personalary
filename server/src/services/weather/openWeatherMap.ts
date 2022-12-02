import axios from 'axios'
import { catchError, concatMap, distinctUntilChanged, filter, from, map, timer } from 'rxjs'
import { z } from 'zod'

import loadConfig from '../../loadConfig'
import type { WeatherDataType } from './WeatherData'

const { refetchInterval } = loadConfig().weather

const WeatherData = z.object({
  dt: z.number(),
  main: z.object({ temp: z.number(), feels_like: z.number() }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
})

const PredictedWeatherData = z.object({
  list: z.array(WeatherData),
})

const OpenWeatherMap = () => {
  return timer(2000, refetchInterval * 1000).pipe(
    concatMap(() => {
      const { apiKey, latitude, longitude, prediction } = loadConfig().weather
      const units = 'metric'
      const endpoint = prediction ? 'forecast' : 'weather'
      const url = `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}&timestamp=${new Date().getTime()}`

      return from(axios.get(url)).pipe(
        catchError((err) => {
          console.error('OpenWeatherMap', err?.response?.statusText || err?.response)
          return from([null])
        })
      )
    }),
    concatMap((res) => {
      const { rotationInterval, prediction } = loadConfig().weather

      return timer(0, rotationInterval * 1000).pipe(
        map(() => {
          const { enabled, position } = loadConfig().weather

          if (!res) {
            return 'SetWeather {"enabled":false}'
          }

          const data = prediction ? PredictedWeatherData.safeParse(res.data) : WeatherData.safeParse(res.data)

          if (!data.success) {
            return 'SetWeather {"enabled":false}'
          }

          const currentData = data.data

          const found = 'list' in currentData ? currentData.list.find((e) => e.dt * 1000 > Date.now()) : currentData

          if (!found) {
            return 'SetWeather {"enabled":false}'
          }

          const response: WeatherDataType = !enabled
            ? { enabled: false }
            : {
                enabled: true,
                position,
                temp: found.main.temp,
                feels_like: found.main.feels_like,
                description: found.weather[0].description,
                icon: found.weather[0].icon,
              }

          return `SetWeather ${JSON.stringify(response)}`
        })
      )
    }),
    filter(Boolean),
    distinctUntilChanged()
  )
}

export default OpenWeatherMap
