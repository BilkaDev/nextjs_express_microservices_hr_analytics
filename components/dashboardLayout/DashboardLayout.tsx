import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import * as styles from './DashboardLayout.styles';
import { TopBar } from '../../../../../rekrutacja/daredrop/dare-drop-fe/src/components/layout/topBar/TopBar';
import { SideBar } from './sideBar/SideBar';

export const DashboardLayout = () => {
  return (
    <Box sx={styles.outerContainer}>
      <TopBar />
      <SideBar />
      <Box component="main" sx={styles.contentWrapper}>
        <Outlet />
      </Box>
    </Box>
  );
};
