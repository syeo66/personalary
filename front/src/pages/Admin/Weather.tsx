import { Box } from 'dracula-ui'
import React from 'react'

import ConfigInput from '../../components/admin/ConfigInput'
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
        <ConfigInput context="weather" name="apiKey" placeholder="Your OpenWeatherMap API Key" label="API key" />
      </Box>
      <pre>{JSON.stringify(data.weather, null, '  ')}</pre>
    </>
  )
}

export default Weather
