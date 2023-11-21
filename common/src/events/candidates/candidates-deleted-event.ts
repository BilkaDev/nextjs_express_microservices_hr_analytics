import { Subjects } from '../subjects';

export interface CandidatesDeletedEvent {
  subject: Subjects.CandidatesDeleted;
  data: {
    id: string;
    userId: string;
  };
}
