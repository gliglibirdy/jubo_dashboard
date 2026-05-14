import { createHashRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Dashboard from '@/pages/Dashboard'
import Residents from '@/pages/Residents'
import CareRecords from '@/pages/CareRecords'
import Capacity from '@/pages/Capacity'
import Workforce from '@/pages/Workforce'
import Settings from '@/pages/Settings'
import NotFound from '@/pages/NotFound'

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'residents', element: <Residents /> },
      { path: 'care-records', element: <CareRecords /> },
      { path: 'capacity', element: <Capacity /> },
      { path: 'workforce', element: <Workforce /> },
      { path: 'settings', element: <Settings /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])
