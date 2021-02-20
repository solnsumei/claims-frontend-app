import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../providers/auth';


const AuthenticatedRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();
  

  return (
    <Route {...rest} render={({ location }) => {
      return isAuthenticated()
      ? children
      : <Redirect to={{
        pathname: '/login',
        state: { from: location },
      }} />
    }} />
  );
}
 
export default AuthenticatedRoute;