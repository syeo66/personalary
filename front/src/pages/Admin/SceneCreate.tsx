import React, { FormEventHandler, useCallback } from 'react'

import Form from '../../components/admin/Form'
import Button from '../../components/Button'
import Box from '../../components/ui/Box'
import PageTitle from '../../components/ui/PageTitle'

const SceneCreate: React.FC = () => {
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const dataObject = Object.fromEntries(formData.entries())
    console.log(dataObject)
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <PageTitle>Create Scene</PageTitle>
      <Box>
        <div>Coming soon</div>
        <input name="test" defaultValue="hello" />
      </Box>
      <Button>Save</Button>
    </Form>
  )
}

export default SceneCreate
