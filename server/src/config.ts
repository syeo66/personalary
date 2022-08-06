import 'dotenv/config'

import configuration from './config.json'
import Config, { ConfigType } from './ConfigType'

let parsedConfig: ConfigType
try {
  parsedConfig = Config.parse(configuration)
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
}

const config: ConfigType = {
  ...parsedConfig,
  background: {
    ...parsedConfig.background,
    apiKey: process.env.NASA_API_KEY || parsedConfig.background.apiKey,
  },
  messages: {
    ...parsedConfig.messages,
    url: process.env.CSV_DOWNLOAD_URL || '',
  },
}

// eslint-disable-next-line no-console
console.log(config)

export default config
