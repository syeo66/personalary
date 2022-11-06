import { Box, Input } from 'dracula-ui'
import React from 'react'

import ConfigSelect from '../../components/admin/ConfigSelect'
import ConfigSwitch from '../../components/admin/ConfigSwitch'
import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import { positions } from './data'

const Weather: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Box p="md" color="black" mt="md" rounded="lg">
        <ConfigSwitch label="Enabled" name="enabled" context="weather" />
        <ConfigSelect context="weather" label="Position" name="position" options={positions} />
        <Box mb="none">
          <label htmlFor="apiKey" className="drac-text drac-text-white">
            API Key
          </label>
          <Input id="apiKey" mt="xs" name="apiKey" placeholder="Your OpenWeatherMap API Key" color="white" />
        </Box>
      </Box>
      <pre>{JSON.stringify(data.weather, null, '  ')}</pre>
    </>
  )
}

export default Weather
