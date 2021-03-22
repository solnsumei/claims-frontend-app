import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { useAuthUser } from '../../hooks/userHook';


const AuthenticatedRoute = ({ middleware, children, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const { data, error } = useAuthUser();

  if (error && error.response && error.response.statusCode === 401) {
    return <Redirect to='/login' />
  }
  
  return (
    <Route {...rest} render={({ location }) => {
      const auth = isAuthenticated();

      if (!auth) {
        return <Redirect to={{ pathname: '/login', state: { from: location }}} />
      }

      if (middleware && middleware.hasChangedPassword && data && data.uses_default_password) {
        return <Redirect to="/change-password" />
      }

      if (middleware && middleware.isAdmin && !auth.isAdmin) {
        return <Redirect to='/profile' />
      }

      return children;
    }} />
  );
}
 
export default AuthenticatedRoute;