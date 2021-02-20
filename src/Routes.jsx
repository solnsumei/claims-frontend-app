import { Route, Switch } from 'react-router-dom';
import AppLayout from './ui/layouts/AppLayout';
import AuthenticatedRoute from './middlewares/AuthenticatedRoute';
import Home from './ui/pages/Home';
import Login from './ui/pages/Login';
import Profile from './ui/pages/Profile';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Switch>
        <AppLayout>
          <AuthenticatedRoute exact path="/">
            <Home />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/profile">
            <Profile />
          </AuthenticatedRoute>
        </AppLayout>
      </Switch>
    </Switch>
  );
}

export default Routes;