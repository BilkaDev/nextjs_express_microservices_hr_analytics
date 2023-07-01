import { z } from 'zod';

import { TranslateType } from '@/contex/translations/translation.types';

export const signUpSchema = (translate: TranslateType) =>
  z
    .object({
      email: z
        .string()
        .min(1, translate('this field cannot be empty'))
        .email(translate('entered value does not match email format')),
      password: z
        .string()
        .min(1, translate('this field cannot be empty'))
        .min(
          6,
          translate('password must be longer than or equal to 6 characters')
        ),
      retypePassword: z
        .string()
        .min(1, translate('this field cannot be empty'))
        .min(
          6,
          translate('password must be longer than or equal to 6 characters')
        ),
      firstName: z.string().min(1, translate('this field cannot be empty')),
      lastName: z.string().min(1, translate('this field cannot be empty'))
    })
    .refine(data => data.password === data.retypePassword, {
      path: ['retypePassword'],
      message: translate('your passwords do no match')
    });
