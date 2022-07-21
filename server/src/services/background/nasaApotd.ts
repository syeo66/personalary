import axios from 'axios'
import { concatMap, distinctUntilChanged, filter, from, map, timer } from 'rxjs'

import config from '../../config'

const { apiKey, refetchInterval, rotationInterval } = config.background

const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=20`

const nasaApotd = () => {
  return timer(0, refetchInterval * 1000)
    .pipe(concatMap(() => from(axios.get(url))))
    .pipe(
      map((res) => {
        return res.data?.map(({ hdurl }: { hdurl: string }) => hdurl).filter(Boolean)
      })
    )
    .pipe(
      concatMap((ev) =>
        timer(0, rotationInterval * 1000).pipe(
          map((i) => (ev[i % ev.length] ? `SetBackground ${ev[i % ev.length]}` : null))
        )
      )
    )
    .pipe(filter(Boolean))
    .pipe(distinctUntilChanged())
}

export default nasaApotd
