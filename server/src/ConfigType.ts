interface ConfigType {
  background: {
    service: 'NasaApotd'

    /**
     * NASA API key
     */
    apiKey: string

    /**
     * Interval in seconds to refetch the background image.
     */
    refetchInterval: number

    /**
     * Interval in seconds to rotate the background image.
     */
    rotationInterval: number
  }
  messages: {
    service: 'CsvDownload'
    url: string
    refetchInterval: number
    rotationInterval: number
    dateFormat: string
  }
}

export default ConfigType
