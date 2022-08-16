import axios from 'axios'
import { RequestHandler } from 'express'

import loadConfig from '../loadConfig'

const { clientId } = loadConfig().musicPlayer

const clientSecret = process.env.SPOTIFY_API_SECRET_KEY

const adminSpotifyAuth: RequestHandler = async (req, res) => {
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
    console.log(JSON.stringify(resp.data, null, '  '))
    res.json({ status: 'OK' })
  } catch (err) {
    console.error(err)
  }
}

export default adminSpotifyAuth
