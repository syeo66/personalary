import { distinctUntilChanged, map, timer } from 'rxjs'

import loadConfig from '../../loadConfig'
import MusicPlayerData, { MusicPlayerDataType } from './MusicPlayerData'

const { musicPlayer: config } = loadConfig()

const MockPlayer = () => {
  return timer(500, 1000).pipe(
    map((v) => {
      const data: MusicPlayerDataType = {
        artist: {
          name: 'Red Ochsenbein',
        },
        album: {
          title: 'Wooohoooo!',
          year: 2020,
          image:
            'https://www.metalkingdom.net/album-cover-artwork/2021/06/2/149894-Lorna-Shore-And-I-Return-to-Nothingness.jpg',
        },
        track: { title: 'Wooohooo!', length: 360 },
        player: { playing: true, position: v % 360 },
        enabled: !!config.enabled && !!config.isAuthorized,
        position: config.position,
      }

      const playerData = MusicPlayerData.parse(data)

      const resp = JSON.stringify(playerData)

      return `SetMusicPlayer ${resp}`
    }),
    distinctUntilChanged()
  )
}

export default MockPlayer
