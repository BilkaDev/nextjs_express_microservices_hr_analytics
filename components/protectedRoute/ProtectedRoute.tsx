import { Outlet, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

import { useTokenContext } from '../../contex/tokenContext/useTokenContext';
import { AppRoute } from '../../AppRoute';
import { useProfile } from '../../common/hooks/useProfile';

import { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { accessToken } = useTokenContext();
  const { isSuccess } = useProfile();

  const checkAccessTokenOrRedirect = useCallback(() => {
    if (!accessToken) {
      navigate(AppRoute.signIn);
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    checkAccessTokenOrRedirect();
  }, [checkAccessTokenOrRedirect, navigate]);
  if (!isSuccess) return null;
  return <div>{!children ? <Outlet /> : children}</div>;
};
