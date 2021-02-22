import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../providers/auth';


const GuestRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Route {...rest} render={() => {
      return !isAuthenticated()
      ? children
      : <Redirect to='/' />
    }} />
  );
}
 
export default GuestRoute;