import { Box, Select } from 'dracula-ui'
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
const ConfigSelect: React.FC<ConfigSelectProps> = ({ context, name, additionalData, options, label, last }) => {
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
    <Box mb={last ? 'none' : 'md'}>
      <Label htmlFor="position">{label}</Label>
      <Select color="white" id="position" name="position" onChange={handleChange} value={selected} mt="xs">
        <option value="default" disabled={true}>
          Select option
        </option>
        {options.map(({ label: l, value }, i) => (
          <option value={value} key={i}>
            {l}
          </option>
        ))}
      </Select>
    </Box>
  )
}

const Label = styled.label``

export default ConfigSelect
