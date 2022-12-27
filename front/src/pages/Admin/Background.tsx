import React from 'react'

import DataDebug from '../../components/admin/DataDebug'
import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'

const Background: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  if (isLoading) {
    return <Loader />
  }

  return <DataDebug data={data.background} />
}

export default Background
