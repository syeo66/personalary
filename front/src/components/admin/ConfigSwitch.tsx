import { Box, Switch } from 'dracula-ui'
import React, { ChangeEventHandler, useCallback } from 'react'

import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import useSendSettings from '../../pages/Admin/hooks/useSendSettings'

interface ConfigSwitchProps {
  additionalData?: Record<string, string | number | boolean>
  context: 'clock' | 'musicPlayer'
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
    <Box mb={last ? 'none' : 'md'}>
      <Switch checked={enabled} color="orange" defaultChecked={enabled} id={name} name={name} onChange={handleChange} />
      <label htmlFor={name} className="drac-text drac-text-white">
        {label}
      </label>
    </Box>
  )
}

export default ConfigSwitch
