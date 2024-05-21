import React, { ChangeEventHandler, useCallback } from 'react'
import styled from 'styled-components'

import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import useSendSettings from '../../pages/Admin/hooks/useSendSettings'

interface ConfigSelectProps {
  additionalData?: Record<string, string | number | boolean>
  context: 'clock' | 'musicPlayer' | 'weather'
  label: string
  last?: boolean
  name: string
  options: { label: string; value: string }[]
}
const ConfigSelect: React.FC<ConfigSelectProps> = ({ context, name, additionalData, options, label }) => {
  const { data, isLoading } = useAdminDataQuery()

  const sendSettings = useSendSettings()
  const selected = data?.[context]?.[name]

  const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => sendSettings.mutate({ [context]: { [name]: e.target.value, ...additionalData } }),
    [sendSettings, additionalData, context, name]
  )

  if (isLoading) {
    return null
  }

  return (
    <FieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <Select id={name} name={name} onChange={handleChange} value={selected}>
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
