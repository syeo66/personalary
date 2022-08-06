import { delay, from } from 'rxjs'

import loadConfig from '../../loadConfig'

const { dateFormat, timeFormat, position, enabled } = loadConfig().clock

const clockConfig = () => {
  return from([
    `SetClockConfig ${JSON.stringify({ dateFormat, timeFormat, position, enabled: enabled ?? true })}`,
  ]).pipe(delay(500))
}

export default clockConfig
