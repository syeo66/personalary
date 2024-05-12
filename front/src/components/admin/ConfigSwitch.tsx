import React, { ChangeEventHandler, useCallback } from 'react'
import styled from 'styled-components'

import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import useSendSettings from '../../pages/Admin/hooks/useSendSettings'

interface ConfigSwitchProps {
  additionalData?: Record<string, string | number | boolean>
  context: 'clock' | 'musicPlayer' | 'weather'
  label: string
  last?: boolean
  name: string
}

const ConfigSwitch: React.FC<ConfigSwitchProps> = ({ name, context, additionalData, label, last }) => {
  const { data, isLoading } = useAdminDataQuery()

  const enabled = data?.[context]?.[name]
  const sendSettings = useSendSettings()

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => sendSettings.mutate({ [context]: { [name]: e.target.checked, ...additionalData } }),
    [sendSettings, additionalData, context, name]
  )

  if (isLoading) {
    return null
  }

  return (
    <FieldContainer>
      <Switch
        checked={enabled}
        defaultChecked={enabled}
        id={name}
        name={name}
        onChange={handleChange}
        type="checkbox"
      />
      <label htmlFor={name}>{label}</label>
    </FieldContainer>
  )
}

const Switch = styled.input`
  width: 2rem;
  height: 1rem;
  appearance: none;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    background-color: white;
    border-radius: 0.5rem;
    width: 2rem;
    height: 1rem;
  }

  &::after {
    content: '';
    display: block;
    background-color: ${({ checked }) => (checked ? 'var(--color-primary)' : 'var(--color-secondary)')};
    border-radius: 0.5rem;
    width: calc(1rem - 2px);
    height: calc(1rem - 2px);
    border: white solid 1px;
    transform: translateX(${({ checked }) => (checked ? 1 : 0)}rem) translateY(-100%);
    transition:
      transform 0.25s ease,
      background 0.25s ease;
  }
`

const FieldContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 0.5rem;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`

export default ConfigSwitch
