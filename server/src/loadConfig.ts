import 'dotenv/config'

import configuration from './config.json'
import Config, { ConfigType } from './ConfigType'

const config: () => ConfigType = () => {
  const parsedConfig = Config.parse(configuration)

  return {
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
}

export default config
