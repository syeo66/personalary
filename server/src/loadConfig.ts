import 'dotenv/config'

import fs from 'fs'
import os from 'os'
import { mergeDeepLeft } from 'ramda'

import configuration from './config.json'
import spotifyRemoteConfig from './configs/spotifyRemoteConfig'
import Config, { ConfigType } from './ConfigType'

export const CONFIG_DIR = process.env.CONFIG_PATH || `${os.homedir()}/.personalary`
export const USER_CONFIG_PATH =
  process.env.USER_CONFIG_PATH ||
  (process.env.CONFIG_PATH && `${process.env.CONFIG_PATH}/config.json`) ||
  `${os.homedir()}/.personalary/config.json`

const loadConfig: () => ConfigType = () => {
  const parsedConfig = configuration

  let userConfig = {}

  if (fs.existsSync(USER_CONFIG_PATH)) {
    const userConfigString = fs.readFileSync(USER_CONFIG_PATH, 'utf8')
    try {
      userConfig = JSON.parse(userConfigString)
    } catch (err) {
      console.error(`Could not parse user config file at ${USER_CONFIG_PATH}`)
      console.error(err)
    }
  }

  const envConfig = {
    background: {
      apiKey: process.env.NASA_API_KEY || parsedConfig.background.apiKey,
    },
    messages: {
      url: process.env.CSV_DOWNLOAD_URL || '',
    },
    musicPlayer: {
      clientId: process.env.SPOTIFY_API_CLIENT_ID || '',
    },
  }

  // TODO spotify stuff. refactor
  let isAuthorized = false

  const { timestamp, expires_in } = spotifyRemoteConfig() || {}
  const now = Math.floor(Date.now() / 1000)

  if (now < timestamp + expires_in) {
    isAuthorized = true
  }
  // ---------

  const dynamicConfig = { musicPlayer: { isAuthorized } }

  const mergedConfig = Config.parse(
    mergeDeepLeft(dynamicConfig)(mergeDeepLeft(userConfig)(mergeDeepLeft(envConfig)(parsedConfig)))
  )

  return mergedConfig
}

export default loadConfig
