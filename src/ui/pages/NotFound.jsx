import { Link } from 'react-router-dom';


const NotFound= () => {
  return (
    <div className="account-page">
      <div className="main-wrapper">
        <div className="account-content">
          <div className="container">					
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Oops, resource not found.</h3>
                <p className="account-subtitle"><Link to="/">Go back</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default NotFound;