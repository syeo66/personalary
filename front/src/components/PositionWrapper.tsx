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
  ${({ vertical, horizontal }) => {
    const horizontalValue = horizontal === 'center' ? 'left: 50%;' : ''
    const verticalValue = vertical === 'center' ? 'top: 50%;' : ''
    const horizontalOffset = horizontal === 'center' ? 'translateX(-50%)' : ''
    const verticalOffset = vertical === 'center' ? 'translateY(-50%)' : ''

    return `
    ${horizontalValue}
    ${verticalValue}
    transform: ${horizontalOffset} ${verticalOffset};
    `
  }}
`

export default PositionWrapper
