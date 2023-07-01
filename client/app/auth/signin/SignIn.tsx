import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppRoute } from '../../AppRoute';
import { useTranslate } from '../../contex/translations/useTranslate';
import { useTokenContext } from '../../contex/tokenContext/useTokenContext';
import { useMutationCustom } from '../../api/useMutationCustom';
import {
  SIGNIN_URL,
  signInSchema,
  SignInSchemaType,
  SingInResponse
} from '../../api/request/auth';

import * as styles from './SignIn.styles';

export const SignIn = () => {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const { onTokenSave } = useTokenContext();
  const navigate = useNavigate();
  const translate = useTranslate();

  const onSuccess = useCallback(
    (res: AxiosResponse<SingInResponse>) => {
      onTokenSave({
        newToken: res.data.accessToken,
        storeTokenInStorage: isRememberMeChecked
      });
      navigate(AppRoute.dashboard);
    },
    [isRememberMeChecked, navigate, onTokenSave]
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isRememberMeChecked}
                onChange={e => setIsRememberMeChecked(e.target.checked)}
              />
            }
            label={translate('Remember me')}
          />
        </FormGroup>
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" disabled={isLoading}>
          {translate('sign in')}
        </Button>
      </Box>
      <Typography>
        {translate("don't have an account?")}{' '}
        <Link to={AppRoute.signUp}>
          {translate('click here to create one')}
        </Link>
      </Typography>
    </Paper>
  );
};
