import 'dotenv/config'

import ConfigType from './ConfigType'

const config: ConfigType = {
  background: {
    apiKey: process.env.NASA_API_KEY || 'DEMO_KEY',
    refetchInterval: 3 * 60 * 60,
    rotationInterval: 3 * 60,
    service: 'NasaApotd',
  },
}

export default config
