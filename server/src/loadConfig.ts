import 'dotenv/config'

import fs from 'fs'
import os from 'os'
import { mergeDeepLeft, pipe } from 'ramda'

import configuration from './config.json'
import Config, { ConfigType } from './ConfigType'

const USER_CONFIG_PATH = process.env.USER_CONFIG_PATH || `${os.homedir()}/.personalary/config.json`

const config: () => ConfigType = () => {
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
  }

  const mergedConfig = pipe(mergeDeepLeft(envConfig), mergeDeepLeft(userConfig), Config.parse)(parsedConfig)

  return mergedConfig
}

export default config
