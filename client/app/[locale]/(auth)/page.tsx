'use client';

import { Box, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';

import { AppRoute } from '@/AppRoute';
import { useTranslate } from '@/client/contex/translations/useTranslate';

import * as styles from './Home.styles';

const Home = () => {
  const translate = useTranslate();
  return (
    <Paper sx={styles.container}>
      <Typography sx={styles.title} variant="h1">
        HR analytics
      </Typography>
      <Box sx={styles.buttonsContainer}>
        <Button
          sx={styles.button}
          component={Link}
          href={AppRoute.signIn}
          variant="contained"
        >
          {translate('sign in')}
        </Button>
        <Button
          sx={styles.button}
          component={Link}
          href={AppRoute.signUp}
          variant="contained"
        >
          {translate('sign up')}
        </Button>
      </Box>
    </Paper>
  );
};

export default Home;
