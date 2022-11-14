import { z } from 'zod'

const WeatherData = z.discriminatedUnion('enabled', [
  z.object({
    description: z.string(),
    enabled: z.literal(true),
    feels_like: z.number(),
    icon: z.string(),
    temp: z.number(),
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
  }),
  z.object({ enabled: z.literal(false) }),
])

export type WeatherDataType = z.infer<typeof WeatherData>

export default WeatherData
