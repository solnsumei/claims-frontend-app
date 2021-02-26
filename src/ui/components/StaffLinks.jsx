import { Link } from 'react-router-dom';

const StaffLinks = () => {
  return (
    <>
      <li className="menu-title">
        <span>Accounts</span>
      </li>
      <li className="submenu">
        <Link to="#"><i className="fa fa-files-o"></i> <span> Claims </span> <span className="menu-arrow"></span></Link>
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
          <li><Link to="reports/invoice-reports"> Claims Report </Link></li>
        </ul>
      </li>
    </>
  );
}

export default StaffLinks;