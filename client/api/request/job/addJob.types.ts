import * as z from 'zod';

import { addJobSchema } from './addJob.schema';

export type AddJobSchemaType = z.infer<ReturnType<typeof addJobSchema>>;
