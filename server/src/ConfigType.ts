interface ConfigType {
  background: {
    service: 'NasaApotd'

    /**
     * NASA API key
     */
    apiKey: string

    /**
     * Interval in seconds to refetch the background images.
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

    /**
     * Interval in seconds to refetch the csv data.
     */
    refetchInterval: number
    rotationInterval: number
    dateFormat: string
  }
  clock: {
    position: ClockPosition
    enabled?: boolean
    timeFormat: string
    dateFormat: string
  }
}

export type ClockPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export default ConfigType
