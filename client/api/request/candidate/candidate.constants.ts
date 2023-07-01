export const CANDIDATE_URL = '/candidates';

export const getCandidateUrl = (id: string | undefined) =>
  `${CANDIDATE_URL}/${id}`;
