export type Job = {
  companyName: string;
  id: string;
  logo: string;
  longDescription: string;
  shortDescription: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  status: 'OPEN' | 'CLOSED';
};

export type JobsResponse = Job[];
