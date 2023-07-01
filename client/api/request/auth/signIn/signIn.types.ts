import * as z from 'zod';

import { signInSchema } from './signIn.schema';

export type SingInResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SignInSchemaType = z.infer<ReturnType<typeof signInSchema>>;
