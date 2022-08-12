import { z } from 'zod'

const Position = z.enum([
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
      enabled: z.boolean().optional(),
      position: Position,
      smooth: z.boolean().optional().default(false),
      style: z.enum(['light', 'dark']),

      /**
       * Type of clock to be displayed
       */
      type: z.literal('analog'),
    }),
  ]),
})

export type ConfigType = z.infer<typeof Config>
export type PositionType = z.infer<typeof Position>

export default Config
