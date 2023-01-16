import axios from 'axios'
import fs from 'fs'
import { catchError, concatMap, defer, distinctUntilChanged, from, map, retry, timer } from 'rxjs'

import spotifyRemoteConfig, { configFilePath, configPath } from '../../configs/spotifyRemoteConfig'
import loadConfig from '../../loadConfig'
import MusicPlayerData, { MusicPlayerDataType } from './MusicPlayerData'

const url = 'https://api.spotify.com/v1/me/player'

const SpotifyRemote = () => {
  return timer(500, 1000).pipe(
    concatMap(() => {
      const spotifyConfig = spotifyRemoteConfig()
      const { enabled } = loadConfig().musicPlayer

      const { access_token } = spotifyConfig || {}

      if (!access_token || !enabled) {
        return from([null])
      }

      const authOptions = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        responseType: 'json' as const,
        withCredentials: true,
      }

      return defer(() =>
        from(axios.get(url, authOptions)).pipe(
          retry({ count: 3, delay: 1000 }),
          catchError((err) => {
            console.error('SpotifyRemote', err)
            return from([null])
          })
        )
      )
    }),
    map((v) => {
      const spotifyConfig = spotifyRemoteConfig()

      if (!spotifyConfig) {
        return 'SetMusicPlayer {"enabled":false}'
      }

      const { timestamp, expires_in, refresh_token } = spotifyConfig
      const now = Math.floor(Date.now() / 1000)
      if (now > timestamp + expires_in - 600) {
        refresh(refresh_token)
      }

      if (!v?.data?.item) {
        return 'SetMusicPlayer {"enabled":false}'
      }

      const { is_playing, progress_ms, item } = v.data
      const { musicPlayer: config } = loadConfig()

      const data: MusicPlayerDataType = {
        artist: {
          name: item.artists?.map((a: { name: string }) => a.name).join(', '),
        },
        album: {
          title: item.album.name,
          year: Number(item.album.release_date.split('-')[0]),
          image: item.album.images[0].url,
        },
        track: { title: item.name, length: item.duration_ms / 1000 },
        player: {
          playing: is_playing,
          position: progress_ms / 1000,
        },
        enabled: !!config.enabled && !!config.isAuthorized,
        position: config.position,
        small: config.small,
        logo: 'Spotify',
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
      JSON.stringify({ ...resp.data, refresh_token, timestamp: Math.floor(Date.now() / 1000) }, null, '  ')
    )
  } catch (err) {
    console.log(err)
  }
}

export default SpotifyRemote
