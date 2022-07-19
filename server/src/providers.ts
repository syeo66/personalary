import { Observable } from 'rxjs'

import nasaApotd from './services/background/nasaApotd'

const providers: Observable<string>[] = [nasaApotd()]

export default providers
