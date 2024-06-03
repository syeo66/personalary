import styled from 'styled-components'

const Button = styled.button`
  background: var(--color-primary);
  border-radius: 0.25rem;
  border: 0 none transparent;
  cursor: pointer;
  color: black;
  font-weight: bold;
  padding: 0.5rem 0.75rem;
  transition:
    transform 250ms,
    background 250ms,
    box-shadow 250ms;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.4);

  &:hover {
    transform: translateY(-1px);
    background: var(--color-tertiary);
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.4);
  }

  &:active {
    transform: translateY(2px);
    background: var(--color-secondary);
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);
  }
`

export default Button
