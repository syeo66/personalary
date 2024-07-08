import React, { FormEventHandler, useCallback, useMemo } from 'react'

import Form from '../../components/admin/Form'
import Button from '../../components/Button'
import Box from '../../components/ui/Box'
import Input from '../../components/ui/Input'
import PageTitle from '../../components/ui/PageTitle'
import Select from '../../components/ui/Select'

const SceneCreate: React.FC = () => {
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const dataObject = Object.fromEntries(formData.entries())
    console.log(dataObject)
  }, [])

  const typeOptions = useMemo(() => [{ label: 'Legacy', value: 'legacy' }], [])

  return (
    <Form onSubmit={handleSubmit}>
      <PageTitle>Create Scene</PageTitle>

      <Box>
        <Input name="title" placeholder="My Scene" label="Title" required />
        <Select name="type" options={typeOptions} label="Type" required />
      </Box>

      <Button>Save</Button>
    </Form>
  )
}

export default SceneCreate
