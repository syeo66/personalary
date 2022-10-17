import { useMutation, useQueryClient } from 'react-query'

export const API_URL = process.env.REACT_APP_ADMIN_URL || `//${document.location.host}/api/admin`

const useSendSettings = () => {
  const queryClient = useQueryClient()

  const sendSettings = useMutation(
    (settings: Record<string, Record<string, string | boolean | number>>) => {
      return fetch(`${API_URL}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['admin-data'])
      },
    }
  )

  return sendSettings
}

export default useSendSettings
