import { useEffect } from 'react';
import { useGetUserQuery } from '../store/api/user';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { data, isLoading, error } = useGetUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate('/login', { replace: true });
    }
  }, [navigate, isLoading, data]);

  return {
    user: data,
    isLoading,
    error,
  };
};
