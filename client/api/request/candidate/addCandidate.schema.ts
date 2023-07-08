import * as z from 'zod';

import { TranslateType } from '@/client/contex/translations/translation.types';

export const addCandidateSchema = (translate: TranslateType) =>
  z.object({
    name: z
      .string()
      .min(1, translate('this field cannot be empty'))
      .min(3, translate('title must be longer than or equal to 3 characters')),
    position: z
      .string()
      .min(1, translate('this field cannot be empty'))
      .min(3, translate('title must be longer than or equal to 3 characters')),
    companyName: z
      .string()
      .min(1, translate('this field cannot be empty'))
      .min(
        3,
        translate('company name must be longer than or equal to 5 characters')
      ),
    logo: z
      .string()
      .min(1, translate('this field cannot be empty'))
      .min(3, translate('logo must be longer than or equal to 5 characters')),
    shortDescription: z
      .string()
      .min(1, translate('this field cannot be empty'))
      .min(
        3,
        translate(
          'short description must be longer than or equal to 5 characters'
        )
      ),
    longDescription: z
      .string()
      .min(1, translate('this field cannot be empty'))
      .min(
        3,
        translate(
          'short description must be longer than or equal to 5 characters'
        )
      )
  });
