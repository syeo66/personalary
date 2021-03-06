import 'dotenv/config'

import ConfigType from './ConfigType'

const config: ConfigType = {
  background: {
    apiKey: process.env.NASA_API_KEY || 'DEMO_KEY',
    refetchInterval: 3 * 60 * 60,
    rotationInterval: 3 * 60,
    service: 'NasaApotd',
  },
  messages: {
    dateFormat: 'dd.MM.yyyy HH:mm:ss',
    refetchInterval: 10 * 60,
    rotationInterval: 1,
    service: 'CsvDownload',
    url: process.env.CSV_DOWNLOAD_URL || '',
  },
  clock: {
    dateFormat: 'E, dd.MM.yyyy',
    position: 'bottom-right',
    timeFormat: 'HH:mm',
  },
}

export default config
