'use client';

import { Box } from '@mui/material';

import { SelectedLanguage } from '../selectedLanguage/SelectedLanguage';

import * as styles from './CenteredLayout.styles';
import { ReactNode } from 'react';

type CenteredLayoutType = {
  children: ReactNode;
};

export const CenteredLayout = ({ children }: CenteredLayoutType) => {
  return (
    <Box sx={styles.layout}>
      <SelectedLanguage isLabel />
      {children}
    </Box>
  );
};
