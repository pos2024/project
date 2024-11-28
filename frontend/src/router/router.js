import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';
import ModeratorDashboardLayout from '../layouts/ModeratorDashboardLayout';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext'; // Import useAuth to access user role
import AdminDashBoard from '../pages/dashboard/AdminDashBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <AdminDashBoard /> },
      { path: 'manage-users', element: <h1>Manage Users</h1> },
      { path: 'reports', element: <h1>Admin Reports</h1> },
    ],
  },
  {
    path: '/moderator-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['Moderator']}>
        <ModeratorDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <h1>Moderator Dashboard</h1> },
      { path: 'reports', element: <h1>Moderator Reports</h1> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
