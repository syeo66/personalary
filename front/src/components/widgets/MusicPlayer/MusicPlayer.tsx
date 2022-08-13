import React from 'react'
import styled from 'styled-components'

import PositionWrapper from '../../PositionWrapper'

const config = { enabled: false, position: 'bottom-left' }

const MusicPlayer: React.FC = () => {
  if (!config?.enabled) {
    return null
  }

  const [vertical, horizontal] = config.position.split('-')

  return (
    <PositionWrapper vertical={vertical} horizontal={horizontal}>
      <Player>
        <Button></Button>
        <Info>Music Player</Info>
        <Progress></Progress>
      </Player>
    </PositionWrapper>
  )
}

const Player = styled.div`
  border: 1px solid white;
  padding 1rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  gap: 0.5rem;
  min-width: clamp(100px,25vw,400px);
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  grid-template-areas:
    "button info"
    "progress progress";
`

const Button = styled.div`
  border-radius: 0.5rem;
  background-color: white;
  aspect-ratio: 1;
  grid-area: button;
`

const Progress = styled.div`
  height: 1rem;
  border: 1px solid white;
  grid-area: progress;
  border-radius: 0.25rem;
`

const Info = styled.div`
  grid-area: info;
`

export default MusicPlayer
