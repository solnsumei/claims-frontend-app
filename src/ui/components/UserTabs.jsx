import { Tabs, Tab } from 'react-bootstrap';
import UserProjectList from './UserProjectList';
import UserClaimsList from './UserClaimsList';


const UserTabs = ({ employee }) => {
  
  const getProjects = () => {
    if (employee.role === 'Manager') {
      return <UserProjectList projectList={[...employee.projects, ...employee.managed_projects]} role={employee.role} />
    }

    return <UserProjectList projectList={employee.projects} role={employee.role}/>
  }

  return (<div className="card tab-box">
  <div className="row user-tabs">
    <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
      <Tabs transition={false} defaultActiveKey="projects" id="uncontrolled-tab-example" className="nav-tabs-bottom">
        <Tab eventKey="projects" title="Projects" className="nav-item nav-link">
          {getProjects()}
        </Tab>
        <Tab eventKey="claims" title="Claims" className="nav-item nav-link">
          <UserClaimsList claimsList={employee.claims} />
        </Tab>
      </Tabs>
    </div>
  </div>
</div>);
}
 
export default UserTabs;