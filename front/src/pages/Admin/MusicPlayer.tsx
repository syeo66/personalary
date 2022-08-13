import React from 'react'

import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'

const MusicPlayer: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  if (isLoading) {
    return <Loader />
  }

  return <pre>{JSON.stringify(data.musicPlayer, null, '  ')}</pre>
}

export default MusicPlayer
