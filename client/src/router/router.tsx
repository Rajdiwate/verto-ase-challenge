import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../components/pages/Login/Login';
import { Signup } from '../components/pages/Signup/Signup';
import { Home } from '../components/pages/Home/Home';
import { HomeLayout } from '../components/layouts/HomeLayout';
import { Cart } from '../components/pages/Cart';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'cart', element: <Cart /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
]);
