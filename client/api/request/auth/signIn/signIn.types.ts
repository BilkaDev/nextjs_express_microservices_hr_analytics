import * as z from 'zod';

import { signInSchema } from './signIn.schema';
import { ProfileAuthResponse } from '../../profile';

export type SingInResponse = ProfileAuthResponse;

export type SignInSchemaType = z.infer<ReturnType<typeof signInSchema>>;
