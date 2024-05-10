import { useQuery } from 'react-query'

import adminDataQuery from '../../queries/adminDataQuery'

const useAdminDataQuery = () => {
  return useQuery(adminDataQuery.key(), () => adminDataQuery.query())
}

export default useAdminDataQuery
