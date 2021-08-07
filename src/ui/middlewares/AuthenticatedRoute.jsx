import { Route, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { useAuthUser } from '../../hooks/userHook';
import { useEffect } from 'react';
import types from '../../utils/types';
import { useState } from 'react';


const AuthenticatedRoute = ({ middleware, children, ...rest }) => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();
  let [auth, setAuth] = useState(isAuthenticated());
  const { data, error } = useAuthUser();


  useEffect(() => {    
    if (!auth) {
      history.replace('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, error])

  if (error && error.response && error.response.statusCode === 401) {
    setAuth(null);
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

      if (middleware && middleware.role === types.MANAGER 
        && (!auth.isAdmin && auth.role !== types.ADMIN && auth.role !== types.MANAGER)
      ) {
        return <Redirect to='/profile' />
      }

      if (middleware && middleware.role === types.ADMIN 
        && (!auth.isAdmin && auth.role !== types.ADMIN)) {
        return <Redirect to='/profile' />
      }

      return children;
    }} />
  );
}
 
export default AuthenticatedRoute;