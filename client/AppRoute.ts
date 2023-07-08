export enum AppRoute {
  home = '/',
  signIn = '/signin',
  signUp = '/signup',
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
