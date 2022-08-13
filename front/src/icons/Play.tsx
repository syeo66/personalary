import React from 'react'

interface PlayProps {
  size?: string
  color?: string
}

const Play: React.FC<PlayProps> = ({ color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    width={size}
    height={size}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 20 20"
  >
    <rect x="0" y="0" width="20" height="20" fill="none" stroke="none" />
    <path fill={color} d="m4 4l12 6l-12 6z" />
  </svg>
)

export default Play
