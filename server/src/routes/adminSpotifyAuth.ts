import axios from 'axios'
import { RequestHandler } from 'express'
import fs from 'fs'

import { configFilePath, configPath } from '../configs/spotifyRemoteConfig'
import loadConfig from '../loadConfig'

const clientSecret = process.env.SPOTIFY_API_SECRET_KEY

const adminSpotifyAuth: RequestHandler = async (req, res) => {
  const { clientId } = loadConfig().musicPlayer
  const code = req.query.code || null
  const redirect_uri = req.query.redirect_uri || null

  if (!code) {
    res.status(428).json({ status: 428, error: 'No code parameter.' })
    return
  }

  if (!redirect_uri) {
    res.status(428).json({ status: 428, error: 'No redirect_uri parameter' })
  }

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
      new URLSearchParams({ code: `${code}`, redirect_uri: `${redirect_uri}`, grant_type: 'authorization_code' }),
      authOptions
    )

    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(configPath)
    }
    fs.writeFileSync(
      configFilePath,
      JSON.stringify({ ...resp.data, timestamp: Math.floor(Date.now() / 1000) }, null, '  ')
    )

    res.json({ status: 'OK' })
  } catch {
    res.status(500).json({ status: 500, error: 'something went wrong' })
  }
}

export default adminSpotifyAuth
