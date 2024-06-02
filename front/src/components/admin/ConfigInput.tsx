import React, { ChangeEventHandler, FocusEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import useSendSettings from '../../pages/Admin/hooks/useSendSettings'

interface ConfigInputProps {
  additionalData?: Record<string, string | number | boolean>
  context: 'clock' | 'musicPlayer' | 'weather'
  label: string
  name: string
  placeholder?: string
}

const ConfigInput: React.FC<ConfigInputProps> = ({ context, name, placeholder, label, additionalData }) => {
  const [value, setValue] = useState<string>('')

  const prevValue = useRef('')

  const { data, isLoading } = useAdminDataQuery()

  const sendSettings = useSendSettings()
  const serverValue = data?.[context]?.[name]

  useEffect(() => {
    if (prevValue.current !== serverValue) {
      prevValue.current = serverValue
      setValue(serverValue)
    }
  }, [serverValue])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setValue(e.target.value)
  }, [])

  const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    () => sendSettings.mutate({ [context]: { [name]: value, ...additionalData } }),
    [additionalData, context, name, sendSettings, value]
  )

  if (isLoading) {
    return null
  }

  return (
    <FieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </FieldContainer>
  )
}

const Label = styled.label`
  display: block;
  margin-bottom: 0.2rem;
`

const Input = styled.input`
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

export default ConfigInput
