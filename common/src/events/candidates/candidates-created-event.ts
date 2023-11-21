import { Subjects } from '../subjects';

export interface CandidatesCreatedEvent {
  subject: Subjects.CandidatesCreated;
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
