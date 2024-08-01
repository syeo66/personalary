import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'

import DataDebug from '../../components/admin/DataDebug'
import EditorList from '../../components/admin/EditorList'
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
  const entries = useMemo(() => (data?.items ?? []).map((item) => ({ id: item.id, title: item.name })), [data?.items])

  return (
    <>
      <PageTitle>Scenes</PageTitle>

      <Box>
        <Button onClick={handleCreateScene}>+ Create Scene</Button>
      </Box>

      <Box>
        {isLoading && <p>Loading...</p>}
        {!isLoading && !data?.items.length && <p>No scenes found</p>}
        <EditorList entries={entries} />
      </Box>

      <DataDebug data={data} />
    </>
  )
}

export default Scenes
