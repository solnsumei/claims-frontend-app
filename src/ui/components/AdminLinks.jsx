import { Link } from 'react-router-dom';

const AdminLinks = () => {
  return (
    <>
      <li className="menu-title">
        <span>Admin Menu</span>
      </li>
      <li>
        <Link to="/departments"><i className="fa fa-briefcase"></i> <span>Departments</span></Link>
      </li>
      <li>
        <Link to="/projects"><i className="fa fa-rocket"></i> <span>Projects</span></Link>
      </li>
      <li>
        <Link to="/employees"><i className="fa fa-user"></i> <span>Employees</span></Link>
      </li>
      <li>
        <Link to="/contractors"><i className="fa fa-users"></i> <span>Contractors</span></Link>
      </li>
      <li className="menu-title">
        <span>Accounts</span>
      </li>
      <li className="submenu">
        <Link to="#"><i className="fa fa-files-o"></i> <span> Invoices </span> <span className="menu-arrow"></span></Link>
        <ul style={{ display: 'none' }}>
          <li><Link to="/invoices/pending">Pending</Link></li>
          <li><Link to="/invoices/approved">Approved</Link></li>
          <li><Link to="/invoices/paid">Paid</Link></li>
          <li><Link to="/invoices/cancelled">Cancelled</Link></li>
        </ul>
      </li>
      <li className="submenu">
        <Link to="#"><i className="fa fa-pie-chart"></i> <span> Reports </span> <span className="menu-arrow"></span></Link>
        <ul style={{ display: 'none' }}>
          <li><Link to="/reports/expense-reports"> Expense Report </Link></li>
          <li><Link to="reports/invoice-reports"> Invoice Report </Link></li>
        </ul>
      </li>
    </>
  );
}

export default AdminLinks;