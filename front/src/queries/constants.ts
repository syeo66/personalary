export const API_URL =
  import.meta.env.VITE_APP_ADMIN_URL || process.env.REACT_APP_ADMIN_URL || `//${document.location.host}/api/admin`
