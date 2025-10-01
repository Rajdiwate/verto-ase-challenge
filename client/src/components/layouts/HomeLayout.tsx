import { Outlet } from 'react-router-dom';
import Header from '../ui/Header';
import { useAuth } from '../../hooks/useAuth';

export const HomeLayout = () => {
  useAuth();
  return (
    <div className="max-w-[1920px] mx-auto">
      <Header />
      <Outlet />
    </div>
  );
};
