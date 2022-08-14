import React from 'react'
import styled from 'styled-components'

import Pause from '../../../icons/Pause'
import Play from '../../../icons/Play'
import PositionWrapper from '../../PositionWrapper'
import Progress from '../../Progress'

const config = { enabled: true, position: 'bottom-left' }

const MusicPlayer: React.FC = () => {
  const isPlaying = false
  const progress = 40
  const maxTime = '3:35'

  if (!config?.enabled) {
    return null
  }

  const [vertical, horizontal] = config.position.split('-')

  return (
    <PositionWrapper vertical={vertical} horizontal={horizontal}>
      <Player>
        <Artwork src="https://www.metalkingdom.net/album-cover-artwork/2021/06/2/149894-Lorna-Shore-And-I-Return-to-Nothingness.jpg" />
        <Button>
          {!isPlaying && <Play size="90%" />}
          {isPlaying && <Pause size="90%" />}
        </Button>
        <Info>
          <Title>The Title Of The Track</Title>
          <Album>The Awesome Album</Album>
          <Artist>The Band</Artist>
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

export default MusicPlayer
