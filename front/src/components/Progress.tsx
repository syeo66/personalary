import React from 'react'
import styled from 'styled-components'

interface ProgressProps {
  labelLeft?: string
  labelRight?: string
  progress: number
}

const Progress: React.FC<ProgressProps> = ({ progress, labelLeft, labelRight }) => {
  return (
    <ProgressWrapper role="progressbar">
      {labelLeft && <LabelLeft>{labelLeft}</LabelLeft>}
      <ProgressBar progress={progress} />
      {labelRight && <LabelRight>{labelRight}</LabelRight>}
    </ProgressWrapper>
  )
}

const LabelLeft = styled.div`
  margin-right: 0.25rem;
`
const LabelRight = styled.div`
  margin-left: 0.25rem;
`

const ProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  grid-area: progress;
`

interface ProgressBarProps {
  progress: number
}
const ProgressBar = styled.div<ProgressBarProps>`
  border-radius: 0.25rem;
  border: 1px solid white;
  height: 1rem;
  overflow: hidden;
  width: 100%;

  &:before {
    background: white;
    content: ' ';
    display: block;
    height: 100%;
    width: ${({ progress }) => progress}%;
    transition: width 0.5s linear;
  }
`

export default Progress
