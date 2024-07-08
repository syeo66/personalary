import React, { HTMLProps } from 'react'
import styled from 'styled-components'

type InputProps = HTMLProps<HTMLInputElement> & {
  label: string
  name: string
}

const Input: React.FC<InputProps> = ({ name, label, ...props }) => {
  return (
    <FieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <InputElement {...props} id={name} name={name} />
    </FieldContainer>
  )
}

const Label = styled.label`
  display: block;
  margin-bottom: 0.2rem;
`

const InputElement = styled.input`
  padding: 0.2rem;
  background: black;
  border-radius: 0.2rem;
  font-size: 1rem;
  color: white;
  border: 2px solid var(--color-secondary);
  outline: none;
  transition: border 0.2s ease-in-out;
  min-width: 20rem;
  transition: min-width 0.2s ease-in-out;

  &:focus {
    border: 2px solid var(--color-primary);
    min-width: calc(100% - 1rem);
  }
`

const FieldContainer = styled.div`
  display: block;
  margin-bottom: 1rem;
  gap: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

export default Input
