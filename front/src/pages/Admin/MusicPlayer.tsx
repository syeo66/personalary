import { Box, Button, Select } from 'dracula-ui'
import React, { ChangeEventHandler, useCallback, useEffect, useRef } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import ConfigSwitch from '../../components/admin/ConfigSwitch'
import Loader from '../../components/Loader'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import useSendSettings, { API_URL } from './hooks/useSendSettings'

const MusicPlayer: React.FC = () => {
  const navigate = useNavigate()

  const isSending = useRef(false)

  const { data, isLoading, refetch } = useAdminDataQuery()

  const { clientId, isAuthorized, position } = data?.musicPlayer || {}

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

  const sendSettings = useSendSettings()

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

  const handlePositionChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => sendSettings.mutate({ musicPlayer: { position: e.target.value } }),
    [sendSettings]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Box p="md" color="black" mt="md" rounded="lg">
        {!isAuthorized && <Button onClick={handleClick}>Connect Spotify</Button>}
        {isAuthorized && (
          <Button onClick={handleDisconnectClick} variant="outline">
            Disconnect Spotify
          </Button>
        )}
      </Box>
      <Box p="md" color="black" mt="md" rounded="lg">
        <ConfigSwitch label="Enabled" name="enabled" context="musicPlayer" />

        <Box mt="md" mb="md">
          <label htmlFor="position">Position</label>
          <Select
            color="white"
            defaultValue="default"
            id="position"
            name="position"
            onChange={handlePositionChange}
            value={position}
          >
            <option value="default" disabled={true}>
              Select option
            </option>
            <option value="top-left">Top-Left</option>
            <option value="top-center">Top-Center</option>
            <option value="top-right">Top-Right</option>
            <option value="center-left">Center-Left</option>
            <option value="center-center">Center-Center</option>
            <option value="center-right">Center-Right</option>
            <option value="bottom-left">Bottom-Left</option>
            <option value="bottom-center">Bottom-Center</option>
            <option value="bottom-right">Bottom-Right</option>
          </Select>
        </Box>

        <ConfigSwitch label="Small player interface" name="small" context="musicPlayer" last />
      </Box>
      <pre>{JSON.stringify(data.musicPlayer, null, '  ')}</pre>
    </>
  )
}

export default MusicPlayer
