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

export const sceneSchema = z.object({
  id: z.number(),
  name: z.string(),

  triggerType: z.enum(['time', 'datetime']),
  triggerData: z.string(),

  active: z.boolean(),
})
export type Scene = z.infer<typeof sceneSchema>
