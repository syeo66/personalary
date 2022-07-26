import axios from 'axios'
import { catchError, concatMap, distinctUntilChanged, filter, from, map, take, timer } from 'rxjs'

import config from '../../config'

const { apiKey, refetchInterval, rotationInterval } = config.background

const rotationCount = Math.floor(refetchInterval / Math.max(1, rotationInterval))

const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${rotationCount}`

const nasaApotd = () => {
  return timer(0, refetchInterval * 1000).pipe(
    concatMap(() => from(axios.get(url))),
    catchError((err, caught) => caught),
    map((res) => {
      return res.data?.map(({ hdurl }: { hdurl: string }) => hdurl).filter(Boolean)
    }),
    concatMap((ev) =>
      timer(0, rotationInterval * 1000).pipe(
        take(Math.ceil(rotationCount)),
        map((i) => (ev[i % ev.length] ? `SetBackground ${ev[i % ev.length]}` : null))
      )
    ),
    filter(Boolean),
    distinctUntilChanged()
  )
}

export default nasaApotd
