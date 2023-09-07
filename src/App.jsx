import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import GlobalStyle from './ui/GlobalStyles';
import Layout from './ui/Layout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Account from './pages/Account';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToasterComponent from './ui/ToasterComponent';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import ProtectedRoute from './pages/ProtectedRoute';
import DarkModeProvider from './context/DarkModeContext';
import ErrorFallback from './ui/ErrorFallback';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

function App() {
    const router = createBrowserRouter([
        {
            element: <Login />,
            path: '/login',
        },
        {
            element: <PageNotFound />,
            path: '*',
        },
        {
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            path: '/',
            errorElement: <ErrorFallback />,
            children: [
                {
                    element: <Navigate to="/dashboard" replace={true} />,
                    index: true,
                },
                {
                    element: <Dashboard />,
                    path: '/dashboard',
                },
                {
                    element: <Bookings />,
                    path: '/bookings',
                },
                {
                    element: <Booking />,
                    path: '/bookings/:id',
                },
                {
                    element: <Checkin />,
                    path: '/checkin/:id',
                },
                {
                    element: <Account />,
                    path: '/account',
                },
                {
                    element: <Cabins />,
                    path: '/cabins',
                },
                {
                    element: <Settings />,
                    path: '/settings',
                },
                {
                    element: <Users />,
                    path: '/users',
                },
            ],
        },
    ]);

    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <GlobalStyle />
                <ReactQueryDevtools initialIsOpen={false} />
                <ToasterComponent />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </DarkModeProvider>
    );
}

export default App;
