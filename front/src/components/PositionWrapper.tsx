import styled from 'styled-components'

interface PositionWrapperProps {
  vertical?: 'top' | 'bottom' | string
  horizontal?: 'left' | 'right' | string
}

const PositionWrapper = styled.div<PositionWrapperProps>`
  color: white;
  position: absolute;
  margin: 0;
  box-sizing: border-box;
  padding: 0;
  ${({ horizontal = 'left' }) => (horizontal === 'right' ? 'right' : 'left')}: clamp(2rem, 10vw, 5rem);
  ${({ vertical = 'top' }) => (vertical === 'bottom' ? 'bottom' : 'top')}: clamp(2rem, 10vw, 5rem);
  ${({ horizontal }) =>
    horizontal === 'center' &&
    `
    left: 50vw;
    transform: translateX(-50%);
  `}
  ${({ vertical }) =>
    vertical === 'center' &&
    `
    top: 50vh;
    transform: translateY(-50%);
  `}
`

export default PositionWrapper
