import axios from 'axios'
import fs from 'fs'
import { distinctUntilChanged, map, timer } from 'rxjs'

import spotifyRemoteConfig, { configFilePath, configPath } from '../../configs/spotifyRemoteConfig'
import loadConfig from '../../loadConfig'
import MusicPlayerData, { MusicPlayerDataType } from './MusicPlayerData'

const { musicPlayer: config } = loadConfig()

const SpotifyRemote = () => {
  return timer(500, 1000).pipe(
    map((v) => {
      const spotifyConfig = spotifyRemoteConfig()

      if (!spotifyConfig?.access_token) {
        return { enabled: false }
      }

      const { timestamp, expires_in, refresh_token } = spotifyConfig
      const now = Math.floor(Date.now() / 1000)
      if (now > timestamp + expires_in - 600) {
        refresh(refresh_token)
      }

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

const clientSecret = process.env.SPOTIFY_API_SECRET_KEY

const refresh = async (refresh_token: string) => {
  const { clientId } = loadConfig().musicPlayer

  const authOptions = {
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  }

  try {
    const resp = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ refresh_token, grant_type: 'refresh_token' }),
      authOptions
    )

    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(configPath)
    }
    fs.writeFileSync(
      configFilePath,
      JSON.stringify({ ...resp.data, timestamp: Math.floor(Date.now() / 1000) }, null, '  ')
    )
  } catch (err) {
    console.log(err)
  }
}

export default SpotifyRemote
