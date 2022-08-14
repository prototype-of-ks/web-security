import useRequest from '../../useRequest';
import { API_URL } from '../../../constants';

export default function useGetToken() {
  return useRequest({
    method: 'GET',
    url: API_URL.GET_TOKEN,
  });
}