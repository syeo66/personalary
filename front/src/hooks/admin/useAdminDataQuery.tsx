import { useQuery } from '@tanstack/react-query'

import adminDataQuery from '../../queries/adminDataQuery'

const useAdminDataQuery = () => useQuery({ queryKey: adminDataQuery.key(), queryFn: () => adminDataQuery.query() })

export default useAdminDataQuery
