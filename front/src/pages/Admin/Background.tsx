import React from 'react'

import DataDebug from '../../components/admin/DataDebug'
import Loader from '../../components/Loader'
import PageTitle from '../../components/ui/PageTitle'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'

const Background: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <PageTitle>Background</PageTitle>
      <DataDebug data={data.background} />
    </>
  )
}

export default Background
