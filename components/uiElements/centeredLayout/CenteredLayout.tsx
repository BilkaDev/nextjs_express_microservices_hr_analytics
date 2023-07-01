import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { SelectedLanguage } from '../selectedLanguage/SelectedLanguage';

import * as styles from './CenteredLayout.styles';

export const CenteredLayout = () => {
  return (
    <Box sx={styles.layout}>
      <SelectedLanguage isLabel />

      <Outlet />
    </Box>
  );
};
