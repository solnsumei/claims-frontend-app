import { Link } from 'react-router-dom';
import Loading from './Loading';

const TopCard = ({ title, value, iconName, url, isLoading=false }) => {
  return (
    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
      <div className="card dash-widget">
        <Link to={url || ''} style={mystyle}>
        <div className="card-body">
            <span className="dash-widget-icon"><i className={`fa fa-${iconName}`}></i></span>
            <div className="dash-widget-info">
              <h3>{isLoading ? <Loading /> : `${value}`}
              </h3>
              <span>{title}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

const mystyle = {
  color: "#212529",
};

export default TopCard;