import * as z from 'zod';

import { signUpSchema } from './signUp.schema';

export type SignUpSchemaType = z.infer<ReturnType<typeof signUpSchema>>;
