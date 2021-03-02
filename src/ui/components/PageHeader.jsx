import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, isHome, buttonTitle, onClick }) => {
  return (
    <div className="page-header">
      <div className={`row${buttonTitle ? ' align-items-center' : ''}`}>
        <div className={buttonTitle ? 'col' : 'col-sm-12'}>
          <h3 className="page-title">{isHome ? "Welcome Admin" : title}</h3>
          <ul className="breadcrumb">
            {title && <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>}
            <li className="breadcrumb-item active">{subtitle || title || "Dashboard"}</li>
          </ul>
        </div>
        {buttonTitle && <div className="col-auto float-right ml-auto">
          <button className="btn add-btn" onClick={onClick}><i className="fa fa-plus"></i> {buttonTitle}</button>
        </div>}
      </div>
    </div>
  );
}

export default PageHeader;