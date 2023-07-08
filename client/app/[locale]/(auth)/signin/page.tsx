'use client';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { AppRoute } from '@/AppRoute';
import { useTranslate } from '@/client/contex/translations/useTranslate';
import { useMutationCustom } from '@/api/useMutationCustom';
import { useSnackbar } from '@/client/contex/snackbarContext/useSnackbar';
import {
  SIGNIN_URL,
  signInSchema,
  SignInSchemaType,
  SingInResponse
} from '@/api/request/auth';

import * as styles from './SignIn.styles';

const SignIn = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useRouter();
  const translate = useTranslate();

  const onSuccess = useCallback(
    (res: AxiosResponse<SingInResponse>) => {
      navigate.push(AppRoute.dashboard);
    },
    [navigate]
  );

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema(translate))
  });

  const { isLoading, error, mutate } = useMutationCustom({
    mutationFn: axios => (payload: SignInSchemaType) =>
      axios.post<SingInResponse>(SIGNIN_URL, payload),
    onSuccess
  });

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error]);

  return (
    <Paper sx={styles.container}>
      <Typography variant="h4" component="h1">
        {translate('sign in')}
      </Typography>
      <Box
        component="form"
        sx={styles.form}
        onSubmit={handleSubmit(data => mutate(data))}
      >
        <TextField
          variant="standard"
          label={translate('email *')}
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          variant="standard"
          label={translate('password *')}
          type="password"
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {translate('sign in')}
        </Button>
      </Box>
      <Typography>
        {translate("don't have an account?")}{' '}
        <Link href={AppRoute.signUp}>
          {translate('click here to create one')}
        </Link>
      </Typography>
    </Paper>
  );
};

export default SignIn;
