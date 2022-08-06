import { delay, from } from 'rxjs'

import config from '../../config'

const { dateFormat, timeFormat, position, enabled } = config.clock

const clockConfig = () => {
  return from([
    `SetClockConfig ${JSON.stringify({ dateFormat, timeFormat, position, enabled: enabled ?? true })}`,
  ]).pipe(delay(500))
}

export default clockConfig
