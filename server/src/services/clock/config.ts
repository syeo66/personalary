import { concatMap, distinctUntilChanged, from, timer } from 'rxjs'

import loadConfig from '../../loadConfig'

const clockConfig = () => {
  return timer(500, 1000).pipe(
    concatMap(() => {
      const { clock: config } = loadConfig()
      return from([`SetClockConfig ${JSON.stringify({ ...config, enabled: config.enabled ?? true })}`])
    }),
    distinctUntilChanged()
  )
}

export default clockConfig
