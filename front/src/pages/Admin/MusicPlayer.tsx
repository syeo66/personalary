import React, { useCallback, useEffect, useRef } from 'react'
import { useMutation } from 'react-query'

import Button from '../../components/Button'
import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'

const API_URL = process.env.REACT_APP_ADMIN_URL || `//${document.location.host}/admin`

const MusicPlayer: React.FC = () => {
  const { data, isLoading } = useAdminDataQuery()

  const isSending = useRef(false)

  const { clientId, isAuthorized } = data?.musicPlayer || {}

  const sendAuth = useMutation(
    ({ code, redirect_uri }: { code: string; redirect_uri: string }) => {
      return fetch(`${API_URL}/spotify/auth?${new URLSearchParams({ code, redirect_uri })}`)
    },
    {
      onSettled: () => {
        isSending.current = false
        document.location.href = `//${document.location.host}/admin/musicplayer`
      },
    }
  )

  useEffect(() => {
    const params = new URLSearchParams(document.location.search)
    const code = params.get('code')

    if (!code) {
      return
    }

    if (isSending.current) {
      return
    }

    isSending.current = true

    console.log(code)
    // send code to server
    sendAuth.mutate({
      code,
      redirect_uri: `${document.location.protocol}//${document.location.host}${document.location.pathname}`,
    })
  }, [sendAuth])

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
