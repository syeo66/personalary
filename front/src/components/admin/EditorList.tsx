import React, { MouseEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

type Entry = {
  id: number
  title: string
}

type EditorListProps = {
  entries: Entry[]
}

const EditorList: React.FC<EditorListProps> = ({ entries }) => {
  const navigate = useNavigate()

  const editClickHandler = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const id = e.currentTarget.getAttribute('data-id')

      navigate(`edit/${id}`)
    },
    [navigate]
  )

  const deleteClickHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.getAttribute('data-id')

    console.log('delete', id)
  }, [])

  return (
    <ListWrapper>
      {entries.map(({ id, title }) => (
        <React.Fragment key={id}>
          <ListEntry onClick={editClickHandler} data-id={id}>
            {title}
          </ListEntry>

          <ListTool onClick={editClickHandler} data-id={id}>
            e
          </ListTool>

          <ListTool onClick={deleteClickHandler} data-id={id}>
            x
          </ListTool>
        </React.Fragment>
      ))}
    </ListWrapper>
  )
}

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem 2rem;
`
const ListEntry = styled.div`
  cursor: pointer;
  padding: 0.25rem 0;
`

const ListTool = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
`

export default EditorList
