import axios from 'axios'
import { catchError, concatMap, distinctUntilChanged, filter, from, map, take, timer } from 'rxjs'

import config from '../../config'
import BackgroundData from './BackgroundData'

const { apiKey, refetchInterval, rotationInterval } = config.background

const rotationCount = Math.floor(refetchInterval / Math.max(1, rotationInterval))

const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${rotationCount}`

interface ApodData {
  copyright?: string
  hdurl: string
}

const nasaApotd = () => {
  return timer(0, refetchInterval * 1000).pipe(
    concatMap(() => from(axios.get<ApodData[]>(url))),
    catchError((err, caught) => caught),
    map((res): BackgroundData[] => {
      return res.data
        ?.map<BackgroundData | null>(({ hdurl, copyright }: ApodData) =>
          hdurl ? { url: hdurl, credits: copyright } : null
        )
        .filter((e): e is BackgroundData => Boolean(e))
    }),
    concatMap((ev) =>
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
