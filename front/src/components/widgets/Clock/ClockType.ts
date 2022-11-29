import { z } from 'zod'

const ClockPosition = z.enum(['top-left', 'top-right', 'bottom-left', 'bottom-right'])

const AnalogClockConfig = z.object({
  dateFormat: z.string(),
  enabled: z.boolean().optional(),
  position: ClockPosition,
  smooth: z.boolean().optional(),
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
const BinaryClockConfig = z.object({
  dateFormat: z.string(),
  enabled: z.boolean().optional(),
  position: ClockPosition,
  style: z.enum(['light', 'dark']),
  type: z.literal('binary'),
})

const ClockConfig = z.discriminatedUnion('type', [AnalogClockConfig, DigitalClockConfig, BinaryClockConfig])

export type ClockConfigType = z.infer<typeof ClockConfig>
export type AnalogClockConfigType = z.infer<typeof AnalogClockConfig>
export type DigitalClockConfigType = z.infer<typeof DigitalClockConfig>
export type BinaryClockConfigType = z.infer<typeof BinaryClockConfig>

export default ClockConfig
