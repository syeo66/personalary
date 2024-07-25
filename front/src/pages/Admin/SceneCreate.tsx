import { useMutation } from '@tanstack/react-query'
import React, { FormEventHandler, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import Form from '../../components/admin/Form'
import Button from '../../components/Button'
import Box from '../../components/ui/Box'
import Input from '../../components/ui/Input'
import PageTitle from '../../components/ui/PageTitle'
import Select from '../../components/ui/Select'
import { API_URL } from '../../queries/constants'

export const createSceneSchema = z.object({
  name: z.string(),
  type: z.enum(['legacy']),
})
export type Scene = z.infer<typeof createSceneSchema>

const SceneCreate: React.FC = () => {
  const navigate = useNavigate()

  const createSceneMutation = useMutation({ mutationFn: createScene, onSuccess: () => navigate('/admin/scenes') })

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const dataObject = Object.fromEntries(formData.entries())
      createSceneMutation.mutate(dataObject)
    },
    [createSceneMutation]
  )

  const typeOptions = useMemo(() => [{ label: 'Legacy', value: 'legacy' }], [])

  return (
    <Form onSubmit={handleSubmit}>
      <PageTitle>Create Scene</PageTitle>

      {createSceneMutation.error && <Box>{createSceneMutation.error.message}</Box>}

      <Box>
        <Input name="name" placeholder="My Scene" label="Title" required />
        <Select name="type" options={typeOptions} label="Type" required />
      </Box>

      <Button type="submit" disabled={createSceneMutation.isPending}>
        Save
      </Button>
    </Form>
  )
}

const createScene = async (dataObject: unknown) => {
  const scene = createSceneSchema.parse(dataObject)
  fetch(`${API_URL}/scene`, {
    method: 'POST',
    body: JSON.stringify(scene),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default SceneCreate
