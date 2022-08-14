import { z } from 'zod'

const MusicPlayerData = z.discriminatedUnion('enabled', [
  z.object({
    track: z.object({
      title: z.string(),

      /**
       * The tracks length in seconds
       */
      length: z.number(),
    }),
    album: z.object({ title: z.string(), year: z.number(), image: z.string() }),
    artist: z.object({ name: z.string() }),
    player: z.object({
      playing: z.boolean(),

      /**
       * Current position of the playhead
       */
      position: z.number(),
    }),
    enabled: z.literal(true),
  }),
  z.object({ enabled: z.literal(false) }),
])

export type MusicPlayerDataType = z.infer<typeof MusicPlayerData>

export default MusicPlayerData
