import { Observable } from 'rxjs'

import nasaApotd from './services/background/nasaApotd'
import clockConfig from './services/clock/config'
import csvDownload from './services/messages/csvDownload'

const providers: Observable<string>[] = [nasaApotd(), csvDownload(), clockConfig()]

export default providers
