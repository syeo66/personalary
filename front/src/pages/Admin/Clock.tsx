import { Box, Select, Switch } from 'dracula-ui'
import React, { ChangeEventHandler, useCallback } from 'react'

import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import useSendSettings from './hooks/useSendSettings'

const Clock: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  const { enabled, type, position } = data?.clock || {}

  const sendSettings = useSendSettings()

  const handleEnabledChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => sendSettings.mutate({ clock: { enabled: e.target.checked, type } }),
    [sendSettings, type]
  )

  const handlePositionChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => sendSettings.mutate({ clock: { position: e.target.value, type } }),
    [sendSettings, type]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Box p="md" color="black" mt="md" rounded="lg">
        <Box>
          <Switch
            checked={enabled}
            color="orange"
            defaultChecked={enabled}
            id="enabled"
            name="enabled"
            onChange={handleEnabledChange}
          />
          <label htmlFor="enabled" className="drac-text drac-text-white">
            Enabled
          </label>
        </Box>

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
      <pre>{JSON.stringify(data.clock, null, '  ')}</pre>
    </>
  )
}

export default Clock
