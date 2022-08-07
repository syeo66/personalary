import { delay, from } from 'rxjs'

import loadConfig from '../../loadConfig'

const { clock: config } = loadConfig()

const clockConfig = () => {
  return from([`SetClockConfig ${JSON.stringify({ ...config, enabled: config.enabled ?? true })}`]).pipe(delay(500))
}

export default clockConfig
