import { useQuery } from 'react-query';
import types from '../utils/types';
import { useAuth } from '../providers/auth';
import { fetchData } from '../services/apiService';


export const useAuthUser = () => {
  const { isAuthenticated } = useAuth();
  
  return useQuery(types.USER, () => fetchData('/auth/user'), {
    enabled: !!isAuthenticated(),
    staleTime: 1000 * 6 * 10,
  });
}