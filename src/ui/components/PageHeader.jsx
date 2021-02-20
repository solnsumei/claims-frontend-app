import { Link } from 'react-router-dom';

const PageHeader = ({ title }) => {
  return (
    <div className="page-header">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="page-title">{ title || "Dashboard" }</h3>
          <ul className="breadcrumb">
            { title && <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>}
            <li className="breadcrumb-item active">{ title || "Dashboard" }</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;