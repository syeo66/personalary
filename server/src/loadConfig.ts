import 'dotenv/config'

import fs from 'fs'
import os from 'os'
import { mergeDeepLeft, pipe } from 'ramda'

import configuration from './config.json'
import Config, { ConfigType } from './ConfigType'
import { configFilePath } from './routes/adminSpotifyAuth'

const USER_CONFIG_PATH = process.env.USER_CONFIG_PATH || `${os.homedir()}/.personalary/config.json`

const loadConfig: () => ConfigType = () => {
  const parsedConfig = configuration

  let userConfig = {}

  if (fs.existsSync(USER_CONFIG_PATH)) {
    const userConfigString = fs.readFileSync(USER_CONFIG_PATH, 'utf8')
    try {
      userConfig = JSON.parse(userConfigString)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Could not parse user config file at ${USER_CONFIG_PATH}`)
      // eslint-disable-next-line no-console
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

  let isAuthorized = false

  // TODO make this modular to allow for different services
  if (fs.existsSync(configFilePath)) {
    const configFile = fs.readFileSync(configFilePath)
    const configFileParsed = JSON.parse(configFile.toString())
    const { timestamp, expires_in } = configFileParsed
    const now = Math.floor(Date.now() / 1000)
    if (now < timestamp + expires_in) {
      isAuthorized = true
    }
  }

  const dynamicConfig = { musicPlayer: { isAuthorized } }

  const mergedConfig = pipe(
    mergeDeepLeft(envConfig),
    mergeDeepLeft(userConfig),
    mergeDeepLeft(dynamicConfig),
    Config.parse
  )(parsedConfig)

  return mergedConfig
}

export default loadConfig
