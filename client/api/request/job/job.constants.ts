export const JOBS_URL = '/jobs';

export const getJobsUrl = (id: string | undefined) => `${JOBS_URL}/${id}`;
