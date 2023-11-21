import { Subjects } from '../subjects';

export interface JobUpdatedEvent {
  subject: Subjects.JobsUpdated;
  data: {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: number;
    userId: string;
  };
}
