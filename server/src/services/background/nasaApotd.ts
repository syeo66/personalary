import axios from 'axios'
import { concatMap, from, map, timer } from 'rxjs'

import config from '../../config'

const { apiKey, refetchInterval, rotationInterval } = config.background

const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=20`

const nasaApotd = () => {
  return timer(0, refetchInterval * 1000)
    .pipe(concatMap(() => from(axios.get(url))))
    .pipe(
      map((res) => {
        return res.data?.map(({ hdurl }: { hdurl: string }) => hdurl)
      })
    )
    .pipe(concatMap((ev) => timer(0, rotationInterval * 1000).pipe(map((i) => `SetBackground ${ev[i % ev.length]}`))))
}

export default nasaApotd
