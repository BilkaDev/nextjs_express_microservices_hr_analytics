import * as z from 'zod';

import { addCandidateSchema } from './addCandidate.schema';

export type AddCandidateSchemaType = z.infer<
  ReturnType<typeof addCandidateSchema>
>;
