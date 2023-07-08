import axios from 'axios';

type BuildClientProps = {
  host: string | null;
  cookie: string | null;
};

export const buildClient = (headers?: BuildClientProps) => {
  if (typeof window == 'undefined' && headers) {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: {
        Host: headers.host,
        Cookie: headers.cookie
      }
    });
  } else {
    return axios.create({
      baseURL: '/'
    });
  }
};
