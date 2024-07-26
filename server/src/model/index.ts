import { z } from 'zod'

export const screenSchema = z.object({
  id: z.number(),
  name: z.string(),

  /**
   * `type` of the screen
   *
   * - `legacy` - Legacy screen type. Will be removed in the future.
   */
  type: z.enum(['legacy']),
})
export type Screen = z.infer<typeof screenSchema>

export const triggerTypeSchema = z.enum(['periodic', 'timeout', 'datetime', 'static'])
export type TriggerType = z.infer<typeof triggerTypeSchema>

export const sceneSchema = z.object({
  id: z.number(),
  name: z.string(),

  triggerType: triggerTypeSchema,
  triggerData: z.string(),

  active: z.boolean(),
})
export type Scene = z.infer<typeof sceneSchema>
