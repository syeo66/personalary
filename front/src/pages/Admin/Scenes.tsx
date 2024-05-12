import React from 'react'
import { useQuery } from 'react-query'

import Box from '../../components/ui/Box'
import scenesQuery from '../../queries/scenesQuery'

const Scenes: React.FC = () => {
  const { data } = useQuery({
    queryFn: () => scenesQuery.query(),
    queryKey: scenesQuery.key(),
  })

  console.log(data)

  return (
    <Box>
      <ul>{data?.items.map((scene) => <li key={scene.id}>{scene.name}</li>)}</ul>
    </Box>
  )
}

export default Scenes
