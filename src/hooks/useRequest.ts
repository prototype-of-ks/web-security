import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useRef } from 'react';
import useCsrfToken from './useCsrfToken';

function useRequest(params: AxiosRequestConfig) {
  const [token] = useCsrfToken();
  const paramRef = useRef(params);
  useEffect(() => () => {}, []);
  
  return (params?: AxiosRequestConfig) => {
    return axios({
      ...paramRef.current,
      ...params,
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': true,
        'CSRF-Token': token,
      },
    });
  };
}

export default useRequest;