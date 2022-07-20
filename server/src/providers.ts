import { Observable } from 'rxjs'

import nasaApotd from './services/background/nasaApotd'
import csvDownload from './services/messages/csvDownload'

const providers: Observable<string>[] = [nasaApotd(), csvDownload()]

export default providers
