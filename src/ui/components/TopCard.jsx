const TopCard = ({ title, value, iconName }) => {
  return (
    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
      <div className="card dash-widget">
        <div className="card-body">
          <span className="dash-widget-icon"><i className={`fa fa-${iconName}`}></i></span>
          <div className="dash-widget-info">
            <h3>{value}</h3>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCard;