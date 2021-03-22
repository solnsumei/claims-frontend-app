import { Link, useLocation } from 'react-router-dom';

const AdminLinks = () => {
  const { pathname } = useLocation();
  const pathList = pathname.split("/");

  return (
    <>
      <li className="menu-title">
        <span>Admin Menu</span>
      </li>
      <li className={pathList?.length > 1 && pathList[1] === "departments" ? "active": ""}>
        <Link to="/departments"><i className="fa fa-briefcase"></i> <span>Departments</span></Link>
      </li>
      <li className={pathList?.length > 1 && pathList[1] === "projects" ? "active": ""}>
        <Link to="/projects"><i className="fa fa-rocket"></i> <span>Projects</span></Link>
      </li>
      <li className={pathList?.length > 1 && pathList[1] === "employees" ? "active": ""}>
        <Link to="/employees"><i className="fa fa-user"></i> <span>Employees</span></Link>
      </li>
      <li className={pathList?.length > 1 && pathList[1] === "contractors" ? "active": ""}>
        <Link to="/contractors"><i className="fa fa-users"></i> <span>Contractors</span></Link>
      </li>
    </>
  );
}

export default AdminLinks;