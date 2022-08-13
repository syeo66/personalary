import React from 'react'

interface PauseProps {
  size?: string
  color?: string
}

const Pause: React.FC<PauseProps> = ({ size = '1em', color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    width={size}
    height={size}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 20 20"
  >
    <rect x="0" y="0" width="20" height="20" fill="none" stroke="none" />
    <path fill={color} d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
  </svg>
)

export default Pause
