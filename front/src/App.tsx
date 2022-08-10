import React, { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Loader from './components/Loader'

const Main = lazy(() => import('./pages/Main'))
const Admin = lazy(() => import('./pages/Admin'))

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loader>Loading...</Loader>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
