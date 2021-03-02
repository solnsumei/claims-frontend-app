import { Switch, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AuthenticatedRoute from '../middlewares/AuthenticatedRoute';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import DepartmentPage from '../pages/departments/DepartmentPage';
import ProjectPage from '../pages/projects/ProjectPage';
import ProjectDetails from '../pages/projects/ProjectDetails';
import EmployeePage from '../pages/employees/EmployeePage';
import EmployeeDetails from '../pages/employees/EmployeeDetails';
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
          <AuthenticatedRoute exact path="/projects/:id" middleware="admins">
            <ProjectDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/projects" middleware="admins">
            <ProjectPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/employees/:id" middleware="admins">
            <EmployeeDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/employees" middleware="admins">
            <EmployeePage />
          </AuthenticatedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
    </AppLayout>
  );
}
 
export default AuthRoutes;