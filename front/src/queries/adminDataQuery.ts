import { API_URL } from './constants'

const adminDataQuery = {
  key: () => ['admin-data'],
  query: async () => {
    const resp = await fetch(API_URL)
    return resp.json()
  },
}

export default adminDataQuery
