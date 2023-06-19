import { useQuery } from 'react-query'

const API_URL =
  import.meta.env.VITE_APP_ADMIN_URL || process.env.REACT_APP_ADMIN_URL || `//${document.location.host}/api/admin`

const useAdminDataQuery = () => {
  return useQuery(adminDataQuery.key(), () => adminDataQuery.query())
}
const adminDataQuery = {
  key: () => ['admin-data'],
  query: async () => {
    const resp = await fetch(API_URL)
    return resp.json()
  },
}

export default useAdminDataQuery
