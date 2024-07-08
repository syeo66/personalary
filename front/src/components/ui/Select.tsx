import React, { HTMLProps } from 'react'
import styled from 'styled-components'

type ConfigSelectProps = HTMLProps<HTMLSelectElement> & {
  label: string
  last?: boolean
  name: string
  options: { label: string; value: string }[]
}

const ConfigSelect: React.FC<ConfigSelectProps> = ({ name, options, label, ...props }) => {
  return (
    <FieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <Select {...props} id={name} name={name}>
        <option value="default" disabled={true}>
          Select option
        </option>
        {options.map(({ label: l, value }, i) => (
          <option value={value} key={i}>
            {l}
          </option>
        ))}
      </Select>
    </FieldContainer>
  )
}

const Label = styled.label`
  display: block;
  margin-bottom: 0.2rem;
`

const Select = styled.select`
  padding: 0.2rem;
  background: black;
  border-radius: 0.2rem;
  font-size: 1rem;
  color: white;
  border: 2px solid var(--color-secondary);
  outline: none;
  transition: border 0.2s ease-in-out;

  &:focus {
    border: 2px solid var(--color-primary);
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

export default ConfigSelect
