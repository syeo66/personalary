import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

import AdminLayout from '../../components/admin/AdminLayout'

const Background = lazy(() => import('./Background'))
const Clock = lazy(() => import('./Clock'))
const Home = lazy(() => import('./Home'))
const Messages = lazy(() => import('./Messages'))
const MusicPlayer = lazy(() => import('./MusicPlayer'))
const ScenesList = lazy(() => import('./ScenesList'))
const SceneCreate = lazy(() => import('./SceneCreate'))
const Weather = lazy(() => import('./Weather'))

const Admin: React.FC = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scenes" element={<ScenesList />} />
          <Route path="/scenes/create" element={<SceneCreate />} />
          <Route path="/background" element={<Background />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/musicplayer" element={<MusicPlayer />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Suspense>
    </AdminLayout>
  )
}

export default Admin
