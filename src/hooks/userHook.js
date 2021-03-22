import { useQuery } from 'react-query';
import types from '../utils/types';
import { fetchUser } from '../services/apiService';


export const useAuthUser = () => {
  
  return useQuery(types.USER, () => fetchUser(), {
    staleTime: 1000 * 6 * 10,
    retry: 1,
  });
}