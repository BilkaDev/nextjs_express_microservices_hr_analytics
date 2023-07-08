'use client';

import { ReactNode, useEffect } from 'react';
import { Box } from '@mui/material';

import { Profile } from '@/api/request/profile';

import { TopBar } from './topBar/TopBar';
import { SideBar } from './sideBar/SideBar';

import * as styles from './DashboardLayout.styles';
import { useProfile } from '@/client/common/hooks/useProfile';

export const DashboardLayout = ({
  children,
  profile
}: {
  children: ReactNode;
  profile: Profile;
}) => {
  const { setProfile } = useProfile();

  setProfile(profile);

  return (
    <Box sx={styles.outerContainer}>
      <TopBar />
      <SideBar />
      <Box component="main" sx={styles.contentWrapper}>
        {children}
      </Box>
    </Box>
  );
};
