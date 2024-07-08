import React, { ChangeEventHandler, useCallback } from 'react'

import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import useSendSettings from '../../pages/Admin/hooks/useSendSettings'
import Select from '../ui/Select'

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

  return <Select id={name} name={name} onChange={handleChange} value={selected} options={options} label={label} />
}

export default ConfigSelect
