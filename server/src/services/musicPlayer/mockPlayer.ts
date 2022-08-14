import { distinctUntilChanged, map, timer } from 'rxjs'

import MusicPlayerData, { MusicPlayerDataType } from './MusicPlayerData'

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
        player: { playing: true, position: Math.round(v / 10) % 360 },
        enabled: true,
      }

      const playerData = MusicPlayerData.parse(data)

      const resp = JSON.stringify(playerData)

      return `SetMusicPlayer ${resp}`
    }),
    distinctUntilChanged()
  )
}

export default MockPlayer
