import { delay, from } from 'rxjs'

import config from '../../config'

const { dateFormat, timeFormat, position } = config.clock

const clockConfig = () => {
  return from([`SetClockConfig ${JSON.stringify({ dateFormat, timeFormat, position })}`]).pipe(delay(500))
}

export default clockConfig
