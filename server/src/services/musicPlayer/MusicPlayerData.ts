import { z } from 'zod'

const MusicPlayerData = z.discriminatedUnion('enabled', [
  z.object({
    /**
     * Some track data
     */
    track: z.object({
      /**
       * The tracks title
       */
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
    position: z.enum([
      'top-left',
      'top-center',
      'top-right',
      'center-left',
      'center-center',
      'center-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]),
    logo: z.enum(['Spotify']).nullable().optional(),
  }),
  z.object({ enabled: z.literal(false) }),
])

export type MusicPlayerDataType = z.infer<typeof MusicPlayerData>

export default MusicPlayerData
