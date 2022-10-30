import { format } from 'date-fns'
import { Box } from 'dracula-ui'
import React from 'react'

import ConfigSelect from '../../components/admin/ConfigSelect'
import ConfigSwitch from '../../components/admin/ConfigSwitch'
import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import { positions } from './data'

const Clock: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  const { type } = data?.clock || {}

  const additionalData = { type }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Box p="md" color="black" mt="md" rounded="lg">
        <ConfigSwitch label="Enabled" name="enabled" context="clock" additionalData={additionalData} />
        <ConfigSelect
          additionalData={additionalData}
          context="clock"
          label="Position"
          name="position"
          options={positions}
        />
        <ConfigSelect
          additionalData={additionalData}
          context="clock"
          label="Date Format"
          name="dateFormat"
          options={dateFormats}
          last
        />
      </Box>

      {type === 'analog' && (
        <Box p="md" color="black" mt="md" rounded="lg">
          <ConfigSwitch label="Smooth seconds movement" name="smooth" context="clock" additionalData={additionalData} />
          <ConfigSelect
            additionalData={additionalData}
            context="clock"
            label="Style"
            name="style"
            options={clockStyles}
            last
          />
        </Box>
      )}
      <pre>{JSON.stringify(data.clock, null, '  ')}</pre>
    </>
  )
}

const clockStyles = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const now = new Date()
const dateFormats = [
  { value: 'dd.MM.yyyy', label: format(now, 'dd.MM.yyyy') },
  { value: 'MM/dd/yyyy', label: format(now, 'MM/dd/yyyy') },
  { value: 'E, dd.MM.yyyy', label: format(now, 'E, dd.MM.yyyy') },
  { value: 'E, MM/dd/yyyy', label: format(now, 'E, MM/dd/yyyy') },
  { value: "MMMM, do ''yy", label: format(now, "MMMM, do ''yy") },
  { value: "EEEE 'of the 'wo 'week '''yy, BBBBB", label: format(now, "EEEE 'of the 'wo 'week '''yy, BBBBB") },
  { value: 'EEEE, dd. MMMM yyyy', label: format(now, 'EEEE, dd. MMMM yyyy') },
]

export default Clock
