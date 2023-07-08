'use client';

import { Profile, PROFILE_KEY, PROFILE_URL } from '@/api/request/profile';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const setProfile = useCallback(
    (profile: null | Profile) => {
      queryClient.setQueryData(PROFILE_KEY, profile);
    },
    [queryClient]
  );

  const profile = useMemo(() => {
    return queryClient.getQueryData<Profile>(PROFILE_KEY) ?? null;
  }, [queryClient]);

  return { profile, setProfile };
};
