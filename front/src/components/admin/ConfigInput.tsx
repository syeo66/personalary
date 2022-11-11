import { Box, Input } from 'dracula-ui'
import React, { ChangeEventHandler, FocusEventHandler, useCallback, useEffect, useRef, useState } from 'react'

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
    (e) => sendSettings.mutate({ [context]: { [name]: value, ...additionalData } }),
    [additionalData, context, name, sendSettings, value]
  )

  if (isLoading) {
    return null
  }

  return (
    <Box mb="none">
      <label htmlFor={name} className="drac-text drac-text-white">
        {label}
      </label>
      <Input
        color="white"
        id={name}
        mt="xs"
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
    </Box>
  )
}

export default ConfigInput
