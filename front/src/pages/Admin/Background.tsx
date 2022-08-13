import React from 'react'

import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'

const Background: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  if (isLoading) {
    return <Loader />
  }

  return <pre>{JSON.stringify(data.background, null, '  ')}</pre>
}

export default Background
