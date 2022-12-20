import axios from 'axios'
import { catchError, concatMap, distinctUntilChanged, filter, from, map, switchMap, take, timer } from 'rxjs'
import { z } from 'zod'

import loadConfig from '../../loadConfig'
import BackgroundData from './BackgroundData'

const { apiKey, refetchInterval, rotationInterval } = loadConfig().background

const rotationCount = Math.floor(refetchInterval / Math.max(1, rotationInterval))

const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${rotationCount}`

const ApodData = z.object({
  copyright: z.optional(z.string()),
  hdurl: z.optional(z.string()),
})
const ApodDataArray = z.array(ApodData)

const nasaApotd = () => {
  return timer(0, refetchInterval * 1000).pipe(
    concatMap(() =>
      from(axios.get(url)).pipe(
        catchError((err) => {
          console.error('NasaApotd', err.response.statusText)
          return [null]
        })
      )
    ),
    map((res): BackgroundData[] => {
      if (!res) {
        return []
      }

      const data = ApodDataArray.safeParse(res.data)

      if (!data.success) {
        console.warn(data.error)
        return []
      }

      return data.data
        ?.map<BackgroundData | null>(({ hdurl, copyright }) => (hdurl ? { url: hdurl, credits: copyright } : null))
        .filter((e): e is BackgroundData => Boolean(e))
    }),
    switchMap((ev) =>
      timer(0, rotationInterval * 1000).pipe(
        take(Math.ceil(rotationCount)),
        map((i) => (ev[i % ev.length] ? `SetBackground ${JSON.stringify(ev[i % ev.length])}` : null))
      )
    ),
    filter(Boolean),
    distinctUntilChanged()
  )
}

export default nasaApotd
