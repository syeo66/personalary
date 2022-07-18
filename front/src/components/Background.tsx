import axios from 'axios'
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

const IMAGE_ROTATION = 120000

const Background: React.FC<PropsWithChildren> = ({ children }) => {
  const [index, setIndex] = useState(0)

  // TODO move this into a configurabel part to be able to fetch from different sources
  const { data } = useQuery(
    'nasa-apod',
    () =>
      axios
        .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API}&count=20`)
        .then((res) => res.data),
    { refetchOnWindowFocus: false }
  )

  const urls: string[] = useMemo(() => data?.map(({ hdurl }: { hdurl: string }) => hdurl) || [], [data])
  const current = urls[index]
  const copyright = data?.[index]?.copyright

  useEffect(() => {
    const interval = setInterval(() => {
      if (!urls.length) {
        return
      }

      setIndex((prev) => {
        const next = (prev + 1) % urls.length

        const img = new Image()
        img.src = urls[(next + 1) % urls.length]

        return next
      })
    }, IMAGE_ROTATION)

    return () => clearInterval(interval)
  }, [urls])

  return (
    <BackgroundRenderer url={current}>
      {children}
      {copyright && <Copyright>&copy; {copyright}</Copyright>}
    </BackgroundRenderer>
  )
}

const Copyright = styled.div`
  bottom: 1rem;
  color: white;
  font-size: 85%;
  left: 1rem;
  position: absolute;
`

interface BackgroundRendererProps {
  url: string
}

const BackgroundRenderer = styled.div<BackgroundRendererProps>`
  background-size: cover;
  background: black ${({ url }) => (url ? `url(${url})` : '')} no-repeat center center;
  height: 100%;
  width: 100%;
`

export default Background
