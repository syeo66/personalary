import axios from 'axios'
import { parse } from 'csv-parse/sync'
import { compareDesc, parse as parseDate } from 'date-fns'
import { concatMap, distinctUntilChanged, filter, from, map, timer } from 'rxjs'

import config from '../../config'

const { url, refetchInterval, rotationInterval, dateFormat } = config.messages

const csvDownload = () => {
  return timer(0, refetchInterval * 1000)
    .pipe(concatMap(() => from(axios.get(url))))
    .pipe(
      map((res) => {
        if (!res.data) {
          return []
        }
        return parse(res.data)
      })
    )
    .pipe(
      concatMap((ev) =>
        timer(0, rotationInterval * 1000).pipe(
          map(() => {
            const now = new Date()

            const mapped = (ev as string[][]).map(
              ([fromDate, toDate, message]: string[]): [Date, Date | null, string] => {
                return [
                  parseDate(fromDate, dateFormat, now),
                  toDate ? parseDate(toDate, dateFormat, now) : null,
                  message,
                ]
              }
            )
            mapped.sort((a, b) => {
              const diff = compareDesc(a[0], b[0])

              if (diff === 0) {
                return compareDesc(a[1] || now, b[1] || now)
              }

              return diff
            })

            const resp = mapped.filter(([fromDate, toDate, message]) => {
              if (!message) {
                return false
              }

              return fromDate < new Date() && (toDate === null || toDate > new Date())
            })

            if (!resp?.[0]?.[2]) {
              return null
            }

            return `ShowMessage ${resp[0][2]}`
          })
        )
      )
    )
    .pipe(filter((message): message is string => typeof message === 'string'))
    .pipe(distinctUntilChanged())
}

export default csvDownload
