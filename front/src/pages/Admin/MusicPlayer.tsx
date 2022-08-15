import React, { useCallback, useEffect } from 'react'

import Button from '../../components/Button'
import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'

const MusicPlayer: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  const { clientId, isAuthorized } = data?.musicPlayer || {}

  useEffect(() => {
    const params = new URLSearchParams(document.location.search)
    const code = params.get('code')

    if (!code) {
      return
    }

    console.log(code)
    // send code to server

    document.location.href = `//${document.location.host}/admin/musicplayer`
  }, [])

  const handleClick = useCallback(() => {
    if (!clientId) {
      return
    }

    const scope = 'user-read-playback-state'

    const url = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope,
      redirect_uri: document.location.href,
    }).toString()}`

    document.location = url
  }, [clientId])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {!isAuthorized && <Button onClick={handleClick}>Connect Spotify</Button>}
      {isAuthorized && <Button onClick={handleClick}>Disconnect Spotify</Button>}
      <pre>{JSON.stringify(data.musicPlayer, null, '  ')}</pre>
    </>
  )
}

export default MusicPlayer
