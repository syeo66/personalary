import { z } from 'zod'

import { Position } from '../ConfigType'

export const InputParamSchema = z.object({
  clock: z
    .discriminatedUnion('type', [
      z.object({
        dateFormat: z.string().optional(),
        enabled: z.boolean().optional(),
        position: Position.optional(),
        timeFormat: z.string().optional(),
        type: z.literal('digital'),
      }),
      z.object({
        dateFormat: z.string().optional(),
        enabled: z.boolean().optional(),
        position: Position.optional(),
        smooth: z.boolean().optional(),
        style: z.enum(['light', 'dark']).optional(),
        type: z.literal('analog'),
      }),
      z.object({
        dateFormat: z.string().optional(),
        enabled: z.boolean().optional(),
        position: Position.optional(),
        style: z.enum(['light', 'dark']).optional(),
        type: z.literal('binary'),
      }),
    ])
    .optional(),
  musicPlayer: z
    .object({
      enabled: z.boolean().optional(),
      position: Position.optional(),
      small: z.boolean().optional(),
    })
    .optional(),
  weather: z
    .object({
      enabled: z.boolean().optional(),
      prediction: z.boolean().optional(),
      position: Position.optional(),
      apiKey: z.string().optional(),
    })
    .optional(),
})
