import { useMutation, useQueryClient } from '@tanstack/react-query'

export const API_URL =
  import.meta.env.VITE_APP_ADMIN_URL || process.env.REACT_APP_ADMIN_URL || `//${document.location.host}/api/admin`

const useSendSettings = () => {
  const queryClient = useQueryClient()

  const sendSettings = useMutation({
    mutationFn: (settings: Record<string, Record<string, string | boolean | number>>) => {
      return fetch(`${API_URL}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-data'] })
    },
  })

  return sendSettings
}

export default useSendSettings
