import React from 'react'

import ConfigInput from '../../components/admin/ConfigInput'
import ConfigSelect from '../../components/admin/ConfigSelect'
import ConfigSwitch from '../../components/admin/ConfigSwitch'
import DataDebug from '../../components/admin/DataDebug'
import Loader from '../../components/Loader'
import Box from '../../components/ui/Box'
import PageTitle from '../../components/ui/PageTitle'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import { positions } from './data'

const Weather: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <PageTitle>Weather</PageTitle>
      <Box>
        <ConfigSwitch label="Enabled" name="enabled" context="weather" />
        <ConfigSelect context="weather" label="Position" name="position" options={positions} />
        <ConfigSwitch label="Prediction" name="prediction" context="weather" />
        <ConfigInput context="weather" name="apiKey" placeholder="Your OpenWeatherMap API Key" label="API key" />
      </Box>
      <DataDebug data={data.weather} />
    </>
  )
}

export default Weather
