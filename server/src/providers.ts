import { pipe } from 'ramda'
import { Observable } from 'rxjs'

import nasaApotd from './services/background/nasaApotd'
import clockConfig from './services/clock/config'
import csvDownload from './services/messages/csvDownload'
import spotifyRemote from './services/musicPlayer/spotifyRemote'

type Service = Observable<string>

const getMessagesService = (prev: Service[]) => [...prev, csvDownload()]
const getBackgroundService = (prev: Service[]) => [...prev, nasaApotd()]
const getClockService = (prev: Service[]) => [...prev, clockConfig()]
const getMusicPlayerService = (prev: Service[]) => [...prev, spotifyRemote()]

const getServices = pipe(getClockService, getBackgroundService, getMessagesService, getMusicPlayerService)

const providers = getServices([])

export default providers
