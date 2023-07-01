export type Candidate = {
  id: string;
  companyName: string;
  logo: string;
  longDescription: string;
  shortDescription: string;
  name: string;
  position: string;
  createdAt: string;
  updatedAt: string;
};

export type CandidatesResponse = Candidate[];
