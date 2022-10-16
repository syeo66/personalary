import { Box, Button, Switch } from 'dracula-ui'
import React, { MouseEventHandler, useCallback, useEffect, useRef } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'

const API_URL = process.env.REACT_APP_ADMIN_URL || `//${document.location.host}/api/admin`

const MusicPlayer: React.FC = () => {
  const navigate = useNavigate()

  const isSending = useRef(false)

  const { data, isLoading, refetch } = useAdminDataQuery()

  const { clientId, isAuthorized, enabled } = data?.musicPlayer || {}

  const sendAuth = useMutation(
    ({ code, redirect_uri }: { code: string; redirect_uri: string }) => {
      return fetch(`${API_URL}/spotify/auth?${new URLSearchParams({ code, redirect_uri })}`)
    },
    {
      onSettled: () => {
        isSending.current = false
        refetch()
        navigate('/admin/musicplayer')
      },
    }
  )

  const removeAuth = useMutation(
    () => {
      return fetch(`${API_URL}/spotify/removeAuth`)
    },
    {
      onSettled: () => {
        refetch()
      },
    }
  )

  const sendSettings = useMutation(
    (settings: Record<string, Record<string, string | boolean | number>>) => {
      return fetch(`${API_URL}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
    },
    {
      onSettled: () => {
        refetch()
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

    sendAuth.mutate({
      code,
      redirect_uri: `${document.location.protocol}//${document.location.host}${document.location.pathname}`,
    })
  }, [sendAuth])

  const handleDisconnectClick = useCallback(() => removeAuth.mutate(), [removeAuth])

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

  const handleEnabledClick: MouseEventHandler<HTMLInputElement> = (e) => {
    sendSettings.mutate({ musicPlayer: { enabled: e.currentTarget.checked } })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {!isAuthorized && <Button onClick={handleClick}>Connect Spotify</Button>}
      {isAuthorized && (
        <Button onClick={handleDisconnectClick} variant="outline">
          Disconnect Spotify
        </Button>
      )}
      <Box p="md" color="grey" mt="md" rounded="lg">
        <Box>
          <Switch color="orange" defaultChecked={enabled} id="enabled" name="enabled" onClick={handleEnabledClick} />
          <label htmlFor="enabled" className="drac-text drac-text-white">
            Enabled
          </label>
        </Box>
      </Box>
      <pre>{JSON.stringify(data.musicPlayer, null, '  ')}</pre>
    </>
  )
}

export default MusicPlayer
