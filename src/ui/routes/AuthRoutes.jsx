import { Switch, Route } from 'react-router-dom';
import { isActiveUser, isAdmin } from '../../utils/projectHelpers';
import AppLayout from '../layouts/AppLayout';
import AuthenticatedRoute from '../middlewares/AuthenticatedRoute';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import DepartmentPage from '../pages/departments/DepartmentPage';
import ProjectPage from '../pages/projects/ProjectPage';
import ProjectDetails from '../pages/projects/ProjectDetails';
import EmployeePage from '../pages/employees/EmployeePage';
import EmployeeDetails from '../pages/employees/EmployeeDetails';
import ContractorPage from '../pages/contractors/ContractorPage';
import ContractorDetails from '../pages/contractors/ContractorDetails';
import ClaimsPage from '../pages/claims/ClaimsPage';
import CreateClaimPage from '../pages/claims/CreateClaim';
import ClaimDetails from '../pages/claims/ClaimDetails';
import Invoice from '../pages/claims/Invoice';
import NotFound from '../pages/NotFound';
import ChangePassword from '../pages/ChangePassword';


const AuthRoutes = () => {
  return (
    <AppLayout>
        <Switch>
          <AuthenticatedRoute exact path="/" middleware={isActiveUser}>
            <Home />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/profile" middleware={isActiveUser}>
            <Profile />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/change-password">
            <ChangePassword />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/departments" middleware={isAdmin}>
            <DepartmentPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/projects/:id" middleware={isAdmin}>
            <ProjectDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/projects" middleware={isAdmin}>
            <ProjectPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/employees/:id" middleware={isAdmin}>
            <EmployeeDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/employees" middleware={isAdmin}>
            <EmployeePage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/contractors/:id" middleware={isAdmin}>
            <ContractorDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/contractors" middleware={isAdmin}>
            <ContractorPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/claims/new/:id" middleware={isActiveUser}>
            <CreateClaimPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/claims/new" middleware={isActiveUser}>
            <CreateClaimPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/claims/:id/view-invoice" middleware={isActiveUser}>
            <Invoice />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/claims/:id" middleware={isActiveUser}>
            <ClaimDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/claims" middleware={isActiveUser}>
            <ClaimsPage />
          </AuthenticatedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
    </AppLayout>
  );
}
 
export default AuthRoutes;