import { Subjects } from '../subjects';

export interface CandidatesUpdatedEvent {
  subject: Subjects.CandidatesUpdated;
  data: {
    id: string;
    shortDescription: string;
    longDescription: number;
    userId: string;
    name: string;
    position: string;
    companyName: string;
    logo: string;
  };
}
