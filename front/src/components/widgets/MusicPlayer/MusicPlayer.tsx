import { format } from 'date-fns'
import React, { memo, useCallback, useState } from 'react'
import styled from 'styled-components'

import useWsMessage from '../../../hooks/useWsMessage'
import Pause from '../../../icons/Pause'
import Play from '../../../icons/Play'
import PositionWrapper from '../../PositionWrapper'
import Progress from '../../Progress'
import { MusicPlayerDataType } from './MusicPlayerData'

const MusicPlayer: React.FC = () => {
  const [config, setConfig] = useState<MusicPlayerDataType>({ enabled: false })

  const messageHandler = useCallback((event: MessageEvent) => {
    try {
      const value = JSON.parse(event.data?.replace('SetMusicPlayer ', ''))
      setConfig(value)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('could not parse message', event.data, error)
    }
  }, [])

  useWsMessage('SetMusicPlayer', messageHandler)

  if (!config?.enabled) {
    return null
  }

  const isPlaying = config.player.playing
  const progress = (config.player.position * 100) / config.track.length
  const maxTime = format(new Date(config.track.length * 1000), 'mm:ss')

  const [vertical, horizontal] = config.position.split('-')

  return (
    <PositionWrapper vertical={vertical} horizontal={horizontal}>
      <Player>
        <Artwork src={config.album.image} />
        <Button>
          {!isPlaying && <Play size="90%" />}
          {isPlaying && <Pause size="90%" />}
        </Button>
        <Info>
          <Title>{config.track.title}</Title>
          <Album>{config.album.title}</Album>
          <Artist>{config.artist.name}</Artist>
        </Info>
        <Progress progress={progress} labelRight={maxTime} />
      </Player>
    </PositionWrapper>
  )
}

const Player = styled.div`
  border: 1px solid white;
  padding 1rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.75);
  gap: 0.5rem;
  width: clamp(220px,25vw,400px);
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  grid-template-areas:
    "artwork artwork"
    "button info"
    "progress progress";
`

const Artwork = styled.img`
  grid-area: artwork;
  max-width: 100%;
  aspect-ratio: 1;
`

const Button = styled.div`
  align-items: center;
  aspect-ratio: 1;
  background-color: white;
  border-radius: 0.5rem;
  color: black;
  display: flex;
  grid-area: button;
  justify-content: center;
  pointer: cursor;
`

const Info = styled.div`
  grid-area: info;
`

const Album = styled.div``
const Artist = styled.div``
const Title = styled.div`
  font-weight: bold;
`

export default memo(MusicPlayer)
