import { Box } from 'dracula-ui'
import React from 'react'
import { useQuery } from 'react-query'

import scenesQuery from '../../queries/scenesQuery'

const Scenes: React.FC = () => {
  const { data } = useQuery({
    queryFn: () => scenesQuery.query(),
    queryKey: scenesQuery.key(),
  })

  console.log(data)

  return (
    <Box p="md" color="black" mt="md" rounded="lg">
      <ul>{data?.items.map((scene) => <li key={scene.id}>{scene.name}</li>)}</ul>
    </Box>
  )
}

export default Scenes
