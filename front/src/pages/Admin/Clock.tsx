import { Box, Select } from 'dracula-ui'
import React, { ChangeEventHandler, useCallback } from 'react'

import ConfigSwitch from '../../components/admin/ConfigSwitch'
import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import useSendSettings from './hooks/useSendSettings'

const Clock: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  const { style, type, position } = data?.clock || {}

  const sendSettings = useSendSettings()

  const handlePositionChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => sendSettings.mutate({ clock: { position: e.target.value, type } }),
    [sendSettings, type]
  )

  const handleStyleChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => sendSettings.mutate({ clock: { style: e.target.value, type } }),
    [sendSettings, type]
  )

  const additionalData = { type }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Box p="md" color="black" mt="md" rounded="lg">
        <ConfigSwitch label="Enabled" name="enabled" context="clock" additionalData={additionalData} />

        <Box mt="md">
          <label htmlFor="position">Position</label>
          <Select
            color="white"
            defaultValue="default"
            id="position"
            name="position"
            onChange={handlePositionChange}
            value={position}
          >
            <option value="default" disabled={true}>
              Select option
            </option>
            <option value="top-left">Top-Left</option>
            <option value="top-center">Top-Center</option>
            <option value="top-right">Top-Right</option>
            <option value="center-left">Center-Left</option>
            <option value="center-center">Center-Center</option>
            <option value="center-right">Center-Right</option>
            <option value="bottom-left">Bottom-Left</option>
            <option value="bottom-center">Bottom-Center</option>
            <option value="bottom-right">Bottom-Right</option>
          </Select>
        </Box>
      </Box>

      {type === 'analog' && (
        <Box p="md" color="black" mt="md" rounded="lg">
          <ConfigSwitch label="Smooth seconds movement" name="smooth" context="clock" additionalData={additionalData} />

          <Box mt="md">
            <label htmlFor="style">Style</label>
            <Select
              color="white"
              defaultValue="default"
              id="style"
              name="style"
              onChange={handleStyleChange}
              value={style}
            >
              <option value="default" disabled={true}>
                Select option
              </option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </Box>
        </Box>
      )}
      <pre>{JSON.stringify(data.clock, null, '  ')}</pre>
    </>
  )
}

export default Clock
