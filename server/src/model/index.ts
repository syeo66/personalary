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
