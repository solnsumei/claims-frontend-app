import { Switch, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AuthenticatedRoute from '../middlewares/AuthenticatedRoute';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import DepartmentPage from '../pages/departments/DepartmentPage';
import NotFound from '../pages/NotFound';


const AuthRoutes = () => {
  return (
    <AppLayout>
        <Switch>
          <AuthenticatedRoute exact path="/">
            <Home />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/profile">
            <Profile />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/departments" middleware="admins">
            <DepartmentPage />
          </AuthenticatedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
    </AppLayout>
  );
}
 
export default AuthRoutes;