import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminLayout from '../components/admin/AdminLayout'

const Admin: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<>... Admin ...</>} />
        <Route path="/clock" element={<>... Clock ...</>} />
        <Route path="/background" element={<>... Background ...</>} />
        <Route path="/messages" element={<>... Message ...</>} />
        <Route path="/musicplayer" element={<>... Music Player ...</>} />
      </Routes>
    </AdminLayout>
  )
}

export default Admin