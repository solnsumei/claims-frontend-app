import { Link, useLocation } from 'react-router-dom';

const AdminLinks = ({ role }) => {
  const { pathname } = useLocation();
  const pathList = pathname.split("/");

  return (
    <>
      <li className="menu-title">
        <span>{ role === 'Admin' ? 'Admin' : 'Manager' } Menu</span>
      </li>
      { role === 'Admin' && <li className={pathList?.length > 1 && pathList[1] === "departments" ? "active": ""}>
        <Link to="/departments"><i className="fa fa-briefcase"></i> <span>Departments</span></Link>
      </li>}
      
      <li className={pathList?.length > 1 && pathList[1] === "projects" ? "active": ""}>
        <Link to="/projects"><i className="fa fa-rocket"></i> <span>Projects</span></Link>
      </li>
      <li className={pathList?.length > 1 && pathList[1] === "employees" ? "active": ""}>
        <Link to="/employees"><i className="fa fa-user"></i> <span>Employees</span></Link>
      </li>
      <li className={pathList?.length > 1 && pathList[1] === "contractors" ? "active": ""}>
        <Link to="/contractors"><i className="fa fa-users"></i> <span>Contractors</span></Link>
      </li>
      <li className="submenu">
					<Link to="#"><i className="fa fa-pie-chart"></i> <span> Reports </span> <span className="menu-arrow"></span></Link>
						<ul style={{ display: 'none' }}>
								<li><Link to="/reports/invoice-reports"> Invoice Report </Link></li>
						</ul>
			</li>
    </>
  );
}

export default AdminLinks;