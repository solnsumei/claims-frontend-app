import { useQuery } from 'react-query';
import { useAuth } from '../providers/auth';
import { fetchData } from '../services/apiService';


export const useFetchQuery = ({ key, url }) => {
  const { isAuthenticated, logoutUser } = useAuth();
  const auth = isAuthenticated();
  
  const result = useQuery(key, () => fetchData(url), {
    enabled: !!(auth?.username)
  });

  if (result && result.error && result.error.response.status === 401) {
    logoutUser();
  }

  return result;
}