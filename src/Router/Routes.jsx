import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout      from '../layouts/RootLayout';
import PrivateRoute    from '../layouts/PrivateRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import Error           from '../pages/Error';
import Home            from '../pages/Home';
import Login           from '../pages/Login';
import Register        from '../pages/Register';

const Explore        = lazy(() => import('../pages/Explore'));
const ServiceDetails = lazy(() => import('../pages/ServiceDetails'));
const About          = lazy(() => import('../pages/About'));
const Contact        = lazy(() => import('../pages/Contact'));
const Blog           = lazy(() => import('../pages/Blog'));
const Privacy        = lazy(() => import('../pages/Privacy'));
const Terms          = lazy(() => import('../pages/Terms'));

const Overview   = lazy(() => import('../pages/dashboard/Overview'));
const Profile    = lazy(() => import('../pages/dashboard/Profile'));
const MyServices = lazy(() => import('../pages/dashboard/MyServices'));
const MyOrders   = lazy(() => import('../pages/dashboard/MyOrders'));
const AddService = lazy(() => import('../pages/dashboard/AddService'));
const Settings   = lazy(() => import('../pages/dashboard/Settings'));

const ManageUsers = lazy(() => import('../pages/dashboard/admin/ManageUsers'));
const ManageItems = lazy(() => import('../pages/dashboard/admin/ManageItems'));
const AllOrders   = lazy(() => import('../pages/dashboard/admin/AllOrders'));
const Categories  = lazy(() => import('../pages/dashboard/admin/Categories'));

const spinner = (
  <div className="flex justify-center items-center min-h-[60vh]">
    <span className="loading loading-spinner loading-lg text-primary" />
  </div>
);

const w = (Component) => (
  <Suspense fallback={spinner}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true,         element: <Home /> },
      { path: 'explore',     element: w(Explore) },
      { path: 'details/:id', element: w(ServiceDetails) },
      { path: 'about',       element: w(About) },
      { path: 'contact',     element: w(Contact) },
      { path: 'blog',        element: w(Blog) },
      { path: 'privacy',     element: w(Privacy) },
      { path: 'terms',       element: w(Terms) },
      { path: 'login',       element: <Login /> },
      { path: 'register',    element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      { index: true,         element: w(Overview)   },
      { path: 'profile',     element: w(Profile)    },
      { path: 'my-services', element: w(MyServices) },
      { path: 'my-orders',   element: w(MyOrders)   },
      { path: 'add-service', element: w(AddService) },
      { path: 'settings',    element: w(Settings)   },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute adminOnly>
            {w(ManageUsers)}
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-items',
        element: (
          <PrivateRoute adminOnly>
            {w(ManageItems)}
          </PrivateRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <PrivateRoute adminOnly>
            {w(AllOrders)}
          </PrivateRoute>
        ),
      },
      {
        path: 'categories',
        element: (
          <PrivateRoute adminOnly>
            {w(Categories)}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;