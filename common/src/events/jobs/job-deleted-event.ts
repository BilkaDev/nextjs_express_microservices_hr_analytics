import { Subjects } from '../subjects';

export interface JobDeletedEvent {
  subject: Subjects.JobsDeleted;
  data: {
    id: string;
    userId: string;
  };
}
