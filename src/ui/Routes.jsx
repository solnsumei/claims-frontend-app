import { Switch, Route } from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes';
import GuestRoute from './middlewares/GuestRoute';
import NotFound from './pages/NotFound';
import Login from './pages/Login';


const Routes = () => {
  return (
    <Switch>
      <GuestRoute path="/login">
        <Login />
      </GuestRoute>
      <AuthRoutes />
      <GuestRoute path="*">
        <Login />
      </GuestRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;