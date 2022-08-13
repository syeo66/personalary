import React from 'react'
import styled from 'styled-components'

import Pause from '../../../icons/Pause'
import Play from '../../../icons/Play'
import PositionWrapper from '../../PositionWrapper'

const config = { enabled: false, position: 'bottom-left' }

const MusicPlayer: React.FC = () => {
  const isPlaying = false
  const progress = 50

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
        <Progress progress={progress} />
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
    "button progress";
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

interface ProgressProps {
  progress: number
}
const Progress = styled.div<ProgressProps>`
  border-radius: 0.25rem;
  border: 1px solid white;
  grid-area: progress;
  height: 1rem;
  overflow: hidden;

  &:before {
    background: white;
    content: ' ';
    display: block;
    height: 100%;
    width: ${({ progress }) => progress}%;
    transition: width 0.5s linear;
  }
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
