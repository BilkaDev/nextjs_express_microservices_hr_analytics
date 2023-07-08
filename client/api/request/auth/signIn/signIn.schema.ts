import { z } from 'zod';

import { TranslateType } from '@/client/contex/translations/translation.types';

export const signInSchema = (translate: TranslateType) =>
  z.object({
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
      )
  });
