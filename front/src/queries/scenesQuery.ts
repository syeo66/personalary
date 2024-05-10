import { z } from 'zod'

import { API_URL } from './constants'

export const sceneSchema = z.object({
  id: z.number(),
  name: z.string(),
})
export type Scene = z.infer<typeof sceneSchema>

export const sceneListSchema = z.object({
  items: z.array(sceneSchema),
})
export type SceneList = z.infer<typeof sceneListSchema>

const scenesQuery = {
  key: () => ['scene-list'],
  query: async (): Promise<SceneList> => {
    const resp = await fetch(`${API_URL}/scene`)
    return sceneListSchema.parse(await resp.json())
  },
}

export default scenesQuery
