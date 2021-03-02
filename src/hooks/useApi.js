import { useQuery } from 'react-query';
import { useAuth } from '../providers/auth';
import { fetchData } from '../services/apiService';


export const useFetchQuery = ({ key, url }) => {
  const { isAuthenticated } = useAuth();
  const auth = isAuthenticated;
  
  return useQuery(key, () => fetchData(url), {
    enabled: (auth && auth.isAdmin)
  });
}