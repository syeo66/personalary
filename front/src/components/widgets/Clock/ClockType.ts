import { z } from 'zod'

const ClockPosition = z.enum(['top-left', 'top-right', 'bottom-left', 'bottom-right'])

const AnalogClockConfig = z.object({
  dateFormat: z.string(),
  enabled: z.boolean().optional(),
  position: ClockPosition,
  style: z.enum(['light', 'dark']),
  type: z.literal('analog'),
})
const DigitalClockConfig = z.object({
  dateFormat: z.string(),
  enabled: z.boolean().optional(),
  position: ClockPosition,
  timeFormat: z.string(),
  type: z.literal('digital'),
})

const ClockConfig = z.discriminatedUnion('type', [AnalogClockConfig, DigitalClockConfig])

export type ClockConfigType = z.infer<typeof ClockConfig>
export type AnalogClockConfigType = z.infer<typeof AnalogClockConfig>
export type DigitalClockConfigType = z.infer<typeof DigitalClockConfig>

export default ClockConfig
