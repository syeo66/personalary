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
}

export default ConfigType
