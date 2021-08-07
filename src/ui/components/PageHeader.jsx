import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, isHome, buttonTitle, onClick, isCloseButton=false }) => {
  return (
    <div className="page-header">
      <div className={`row${buttonTitle ? ' align-items-center' : ''}`}>
        <div className={buttonTitle ? 'col' : 'col-sm-12'}>
          <h3 className="page-title">{title ? title : "Welcome Admin"}</h3>
          <ul className="breadcrumb">
            {!isHome && title && <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>}
            <li className="breadcrumb-item active">
              {isHome ? "Dashboard" : (subtitle 
                ? <Link to={`/${subtitle}`}>{subtitle}</Link>
                : (title || "Dashboard"))}
            </li>
          </ul>
        </div>
        {buttonTitle && <div className="col-auto float-right ml-auto">
          <button className={`btn ${isCloseButton ? "btn-outline-secondary" : "add-btn"}`} onClick={onClick}>
            <i className={`fa fa-${ isCloseButton ? "times" : "plus"}`}></i> {buttonTitle}</button>
        </div>}
      </div>
    </div>
  );
}

export default PageHeader;