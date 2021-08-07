import { Switch, Route } from 'react-router-dom';
import { isActiveUser, isAdmin, isManager } from '../../utils/projectHelpers';
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
import NotFound from '../pages/NotFound';
import ChangePassword from '../pages/ChangePassword';
import ReportsPage from '../pages/reports/ReportsPage';


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
          <AuthenticatedRoute path="/projects/:id" middleware={isManager}>
            <ProjectDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/projects" middleware={isManager}>
            <ProjectPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/employees/:id" middleware={isAdmin}>
            <EmployeeDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/employees" middleware={isManager}>
            <EmployeePage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/contractors/:id" middleware={isAdmin}>
            <ContractorDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/contractors" middleware={isManager}>
            <ContractorPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/claims/new/:id" middleware={isActiveUser}>
            <CreateClaimPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/claims/new" middleware={isActiveUser}>
            <CreateClaimPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/claims/filter/:status" middleware={isActiveUser}>
            <ClaimsPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/claims/:id" middleware={isActiveUser}>
            <ClaimDetails />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/claims" middleware={isActiveUser}>
            <ClaimsPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/reports/invoice-reports" middleware={isActiveUser}>
            <ReportsPage />
          </AuthenticatedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
    </AppLayout>
  );
}
 
export default AuthRoutes;