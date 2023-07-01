'use client';
import axios from 'axios';
import { useMemo } from 'react';

// import { useTokenContext } from '@/contex/tokenContext/useTokenContext';

export const useAxios = () => {
  // const { accessToken } = useTokenContext();

  return useMemo(() => {
    return axios.create({
      headers: {
        'Content-type': 'application/json'
        // Authorization: `Bearer ${accessToken}`
      },
      baseURL: process.env.REACT_APP_API_URL
    });
  }, []);
};
