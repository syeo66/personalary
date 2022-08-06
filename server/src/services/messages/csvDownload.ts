import axios from 'axios'
import { parse } from 'csv-parse/sync'
import { compareDesc, parse as parseDate } from 'date-fns'
import { catchError, concatMap, distinctUntilChanged, EMPTY, filter, from, map, take, timer } from 'rxjs'

import loadConfig from '../../loadConfig'

const { url, refetchInterval, rotationInterval, dateFormat } = loadConfig().messages

const csvDownload = () => {
  if (!url) {
    return EMPTY
  }

  return timer(0, refetchInterval * 1000).pipe(
    concatMap(() => from(axios.get(url))),
    catchError((err, caught) => caught),
    map((res) => {
      if (!res.data) {
        return []
      }
      return parse(res.data)
    }),
    concatMap((ev) =>
      timer(0, rotationInterval * 1000).pipe(
        take(Math.ceil(refetchInterval / rotationInterval)),
        map(() => {
          const now = new Date()

          const mapped = (ev as string[][]).map(
            ([fromDate, toDate, message]: string[]): [Date, Date | null, string] => {
              return [parseDate(fromDate, dateFormat, now), toDate ? parseDate(toDate, dateFormat, now) : null, message]
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

          const [[fromDate, toDate, message]] = resp

          return `ShowMessage ${JSON.stringify({ fromDate, toDate, message })}`
        })
      )
    ),
    filter((message): message is string => typeof message === 'string'),
    distinctUntilChanged()
  )
}

export default csvDownload
