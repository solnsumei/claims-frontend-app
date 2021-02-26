import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../providers/auth';


const AuthenticatedRoute = ({ middleware, children, ...rest }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Route {...rest} render={({ location }) => {
      const auth = isAuthenticated();

      if (!auth) {
        return <Redirect to={{ pathname: '/login', state: { from: location }}} />
      }

      if (middleware && middleware === 'admins' && !auth.isAdmin) {
        return <Redirect to='/profile' />
      }

      return children;
    }} />
  );
}
 
export default AuthenticatedRoute;