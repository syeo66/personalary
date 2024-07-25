import { useQuery } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'

import DataDebug from '../../components/admin/DataDebug'
import Button from '../../components/Button'
import Box from '../../components/ui/Box'
import PageTitle from '../../components/ui/PageTitle'
import scenesQuery from '../../queries/scenesQuery'

const Scenes: React.FC = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryFn: () => scenesQuery.query(),
    queryKey: scenesQuery.key(),
  })

  const handleCreateScene = useCallback(() => navigate('/admin/scenes/create'), [navigate])

  return (
    <>
      <PageTitle>Scenes</PageTitle>

      <Box>
        <Button onClick={handleCreateScene}>+ Create Scene</Button>
      </Box>

      <Box>
        {isLoading && <p>Loading...</p>}
        {!isLoading && !data?.items.length && <p>No scenes found</p>}
        <ul>{data?.items.map((scene) => <li key={scene.id}>{scene.name}</li>)}</ul>
      </Box>

      <DataDebug data={data} />
    </>
  )
}

export default Scenes
