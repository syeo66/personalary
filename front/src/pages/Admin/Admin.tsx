import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminLayout from '../../components/admin/AdminLayout'
import Background from './Background'
import Clock from './Clock'
import Home from './Home'
import Messages from './Messages'
import MusicPlayer from './MusicPlayer'

const Admin: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/background" element={<Background />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/musicplayer" element={<MusicPlayer />} />
      </Routes>
    </AdminLayout>
  )
}

export default Admin
