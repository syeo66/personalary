import { RequestHandler } from 'express'
import fs from 'fs'

import { configFilePath } from '../configs/spotifyRemoteConfig'

const adminSpotifyRemoveAuth: RequestHandler = async (_, res) => {
  if (fs.existsSync(configFilePath)) {
    fs.rmSync(configFilePath)
  }
  res.json({ status: 'OK' })
}

export default adminSpotifyRemoveAuth
