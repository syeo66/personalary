import { z } from 'zod'

const ClockPosition = z.enum(['top-left', 'top-right', 'bottom-left', 'bottom-right'])

const Config = z.object({
  background: z.object({
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
    url: z.string(),

    /**
     * Interval in seconds to refetch the csv data.
     */
    refetchInterval: z.number(),
    rotationInterval: z.number(),
    dateFormat: z.string(),
  }),
  clock: z.object({
    position: ClockPosition,
    enabled: z.boolean().optional(),
    timeFormat: z.string(),
    dateFormat: z.string(),
  }),
})

export type ConfigType = z.infer<typeof Config>
export type ClockPositionType = z.infer<typeof ClockPosition>

export default Config
