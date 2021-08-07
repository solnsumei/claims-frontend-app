import { Link } from 'react-router-dom';
import Loading from './Loading';


const ClaimsCard = ({ claimsCount, label, linkUrl, isLoading=false }) => {
  return (<div className="card">
  <div className="card-body">
    <div className="d-flex justify-content-between mb-3">
      <div>
        <span className="d-block">{label}</span>
      </div>
      <div>
      </div>
    </div>
    <h3 className="mb-3">{isLoading ? <Loading /> : `${claimsCount}`}</h3>
    <div className="progress mb-2" style={{ height: '5px'}}>
      <div className="progress-bar bg-primary" role="progressbar"  style={{ width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <p className="mb-0"><Link to={linkUrl}>Details...</Link></p>
  </div>
</div>);
}
 
export default ClaimsCard;