import { useMutation } from '@tanstack/react-query'
import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import ConfigSelect from '../../components/admin/ConfigSelect'
import ConfigSwitch from '../../components/admin/ConfigSwitch'
import DataDebug from '../../components/admin/DataDebug'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import Box from '../../components/ui/Box'
import PageTitle from '../../components/ui/PageTitle'
import useAdminDataQuery from '../../hooks/admin/useAdminDataQuery'
import { positions } from './data'
import { API_URL } from './hooks/useSendSettings'

const MusicPlayer: React.FC = () => {
  const navigate = useNavigate()

  const isSending = useRef(false)

  const { data, isLoading, refetch } = useAdminDataQuery()

  const { clientId, isAuthorized } = data?.musicPlayer || {}

  const sendAuth = useMutation({
    mutationFn: ({ code, redirect_uri }: { code: string; redirect_uri: string }) =>
      fetch(`${API_URL}/spotify/auth?${new URLSearchParams({ code, redirect_uri })}`),
    onSettled: () => {
      isSending.current = false
      refetch()
      navigate('/admin/musicplayer')
    },
  })

  const removeAuth = useMutation({
    mutationFn: () => fetch(`${API_URL}/spotify/removeAuth`),
    onSettled: () => {
      refetch()
    },
  })

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

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <PageTitle>Music Player</PageTitle>
      <Box>
        {!isAuthorized && <Button onClick={handleClick}>Connect Spotify</Button>}
        {isAuthorized && <Button onClick={handleDisconnectClick}>Disconnect Spotify</Button>}
      </Box>
      <Box>
        <ConfigSwitch label="Enabled" name="enabled" context="musicPlayer" />
        <ConfigSelect context="musicPlayer" label="Position" name="position" options={positions} />
        <ConfigSwitch label="Small player interface" name="small" context="musicPlayer" last />
      </Box>
      <DataDebug data={data.musicPlayer} />
    </>
  )
}

export default MusicPlayer
