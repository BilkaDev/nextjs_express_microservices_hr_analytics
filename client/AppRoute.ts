export enum AppRoute {
  home = '/',
  signIn = '/auth/signin',
  signUp = '/auth/signup',
  dashboard = '/dashboard',
  profile = '/profile',
  calendar = '/calendar',
  jobs = '/jobs',
  addJob = '/jobs/add',
  candidates = '/candidates',
  addCandidate = '/candidates/add'
}

export const getSingleJobUrl = (jobId: string) => `${AppRoute.jobs}/${jobId}`;
export const getSingleCandidateUrl = (candidateId: string) =>
  `${AppRoute.candidates}/${candidateId}`;
