import axios from 'axios'
import { catchError, concatMap, distinctUntilChanged, filter, from, map, timer } from 'rxjs'
import { z } from 'zod'

import loadConfig from '../../loadConfig'
import { WeatherDataType } from './WeatherData'

const { refetchInterval } = loadConfig().weather

const OpenWeatherData = z.object({
  list: z.array(
    z.object({
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
  ),
})

const OpenWeatherMap = () => {
  return timer(0, refetchInterval * 1000).pipe(
    concatMap(() => {
      const { apiKey, latitude, longitude } = loadConfig().weather
      const units = 'metric'
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`

      return from(axios.get(url))
    }),
    catchError((err, caught) => {
      console.error(err.response.statusText)
      return caught
    }),
    concatMap((res) => {
      const { rotationInterval } = loadConfig().weather

      return timer(0, rotationInterval * 1000).pipe(
        map(() => {
          const { enabled, position } = loadConfig().weather
          const data = OpenWeatherData.safeParse(res.data)

          if (!data.success) {
            return 'SetWeather {"enabled":false}'
          }

          const response: WeatherDataType = !enabled
            ? { enabled: false }
            : {
                enabled: true,
                position,
                temp: data.data.list[0].main.temp,
                feels_like: data.data.list[0].main.feels_like,
                description: data.data.list[0].weather[0].description,
                icon: data.data.list[0].weather[0].icon,
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
