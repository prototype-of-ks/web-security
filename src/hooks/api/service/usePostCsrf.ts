import useRequest from '../../useRequest';
import { API_URL } from '../../../constants';

export default function usePostCsrf() {
  return useRequest({
    method: 'POST',
    url: API_URL.POST_CSRF
  });
}