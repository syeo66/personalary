import { z } from 'zod'

export const Position = z.enum([
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center-center',
  'center-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
])

const Config = z.object({
  background: z.object({
    /**
     * The service to use for the background.
     *
     * Currently only NasaApotd exists.
     */
    service: z.literal('NasaApotd'),

    /**
     * NASA API key
     */
    apiKey: z.string().default('DEMO_KEY'),

    /**
     * Interval in seconds to refetch the background images.
     */
    refetchInterval: z.number(),

    /**
     * Interval in seconds to rotate the background image.
     */
    rotationInterval: z.number(),
  }),
  messages: z.object({
    service: z.literal('CsvDownload'),

    /**
     * The URL of the CSV document to download.
     */
    url: z.string(),

    /**
     * Interval in seconds to refetch the csv data.
     */
    refetchInterval: z.number(),
    rotationInterval: z.number(),
    dateFormat: z.string(),
  }),
  clock: z.discriminatedUnion('type', [
    z.object({
      /**
       * The format of the date portion of the clock. See https://date-fns.org/v2.29.1/docs/format
       */
      dateFormat: z.string(),
      enabled: z.boolean().optional().default(true),
      /**
       * The position of the clock.
       */
      position: Position,
      timeFormat: z.string(),

      /**
       * Type of clock to be displayed
       */
      type: z.literal('digital'),
    }),
    z.object({
      /**
       * The format of the date portion of the clock. See https://date-fns.org/v2.29.1/docs/format
       */
      dateFormat: z.string(),
      enabled: z.boolean().optional().default(true),
      position: Position,
      smooth: z.boolean().optional().default(false),
      style: z.enum(['light', 'dark']),

      /**
       * Type of clock to be displayed
       */
      type: z.literal('analog'),
    }),
    z.object({
      enabled: z.boolean().optional().default(true),
      position: Position,
      style: z.enum(['light', 'dark']),

      /**
       * Type of clock to be displayed
       */
      type: z.literal('binary'),
    }),
  ]),
  musicPlayer: z.object({
    /**
     * The service to use for the music player.
     *
     * Currently only SpotifyRemote exists.
     */
    service: z.literal('SpotifyRemote'),

    /**
     * The position of the music player.
     */
    position: Position,

    /**
     * Enable or disable the music player.
     */
    enabled: z.boolean().optional(),

    /**
     * The client id for using the Spotify API
     */
    clientId: z.string(),

    /**
     * Is Spotify connected and authorized
     */
    isAuthorized: z.boolean().optional().default(false),

    /**
     * Set the player to be smaller
     */
    small: z.boolean().optional().default(false),
  }),
  weather: z.object({
    /**
     * Enable or disable the weather data.
     */
    enabled: z.boolean().optional(),

    /**
     * The service to use for the weather data.
     *
     * Currently only OpenWeatherMap exists.
     *
     * See https://openweathermap.org/api
     */
    service: z.literal('OpenWeatherMap'),

    /**
     * OpenWeatherMap API key
     *
     * https://home.openweathermap.org/api_keys
     */
    apiKey: z.string().default('NO_KEY'),

    /**
     * The position of the weather widget.
     */
    position: Position,

    /**
     * Interval in seconds to refetch the weather data.
     */
    refetchInterval: z.number(),

    /**
     * Interval in seconds to refresh the weather data.
     */
    rotationInterval: z.number(),

    /**
     * Should it show the current weather or a prediction.
     */
    prediction: z.boolean(),

    longitude: z.number(),
    latitude: z.number(),
  }),
})

export type ConfigType = z.infer<typeof Config>
export type PositionType = z.infer<typeof Position>

export default Config
