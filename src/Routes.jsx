import { Switch } from 'react-router-dom';
import AppLayout from './ui/layouts/AppLayout';
import AuthenticatedRoute from './middlewares/AuthenticatedRoute';
import GuestRoute from './middlewares/GuestRoute';
import Home from './ui/pages/Home';
import Login from './ui/pages/Login';
import Profile from './ui/pages/Profile';

const Routes = () => {
  return (
    <Switch>
      <GuestRoute path="/login">
        <Login />
      </GuestRoute>
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