import { Subjects } from '../subjects';

export interface JobCreatedEvent {
  subject: Subjects.JobsCreated;
  data: {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: number;
    userId: string;
  };
}
