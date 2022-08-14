import styled from 'styled-components'

const Button = styled.button`
  background: white;
  border-radius: 0.25rem;
  border: 2px solid rgb(16, 16, 214);
  color: rgb(16, 16, 214);
  cursor: pointer;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  transition: transform 250ms, background 250ms, box-shadow 250ms;
  box-shadow: 0 0 6px rgba(16, 16, 214, 0.8);

  &:hover {
    transform: translateY(-1px);
    background: rgba(16, 16, 214, 0.1);
    box-shadow: 0 4px 8px rgba(16, 16, 214, 0.6);
  }

  &:active {
    transform: translateY(2px);
    background: rgba(16, 16, 214, 0.2);
    box-shadow: 0 0 3px rgba(16, 16, 214, 0.9);
  }
`

export default Button
