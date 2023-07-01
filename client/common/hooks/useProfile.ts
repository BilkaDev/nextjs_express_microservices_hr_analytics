import { useNavigate } from 'react-router-dom';

import { useQueryCustom } from '@/api/useQueryCustom';
import { useTokenContext } from '@/contex/tokenContext/useTokenContext';
import { tokenStorageKey } from '@/contex/tokenContext/TokenContextProvider';
import { AppRoute } from '@/AppRoute';
import { Profile, PROFILE_URL } from '@/api/request/profile';

export const useProfile = () => {
  const { accessToken } = useTokenContext();
  const navigate = useNavigate();
  const { isError, isLoading, isSuccess, data } = useQueryCustom<Profile>({
    queryKey: ['profile'],
    url: PROFILE_URL,
    staleTime: 60 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    retry: false,
    enabled: !!accessToken,
    onError: () => {
      localStorage.removeItem(tokenStorageKey);
      navigate(AppRoute.signIn);
    }
  });
  return {
    isError,
    isSuccess,
    isLoading,
    profile: isSuccess ? data.data : null
  };
};
