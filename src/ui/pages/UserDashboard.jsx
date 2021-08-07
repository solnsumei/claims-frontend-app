
import { Link } from 'react-router-dom';
import { useFetchQuery } from '../../hooks/useApi';
import types from '../../utils/types';
import ClaimsCard from '../components/ClaimsCard';
import Loading from '../components/Loading';
import { toDateString } from '../../utils/dateHelpers';


const UserDashboard = () => {

  const { data: projects, isLoading: projectsLoading } = useFetchQuery({ key: types.PROJECTS, url: '/user/projects/' });

  const { data: claims, isLoading } = useFetchQuery({ key: [types.CLAIMS, 'latest'], url: "/claims/latest" });
  const { data: pendingClaims, isLoading: pendingLoading } = useFetchQuery({ key: [types.CLAIMS, 'pending'], url: "/claims?status=pending" });
  const { data: verifiedClaims, isLoading: verifiedLoading } = useFetchQuery({ key: [types.CLAIMS, 'verified'], url: "/claims?status=verified" });
  const { data: approvedClaims, isLoading: approvedLoading } = useFetchQuery({ key: [types.CLAIMS, 'approved'], url: "/claims?status=approved" });
  const { data: paidClaims, isLoading: paidLoading } = useFetchQuery({ key: [types.CLAIMS, 'paid'], url: "/claims?status=paid" });

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card-group m-b-30">
            <ClaimsCard
              label='Pending Claims'
              claimsCount={pendingClaims?.length || 0}
              linkUrl="/claims/filter/pending"
              isLoading={pendingLoading}
            />
            <ClaimsCard
              label='Verified Claims'
              claimsCount={verifiedClaims?.length || 0}
              linkUrl="/claims/filter/verified"
              isLoading={verifiedLoading}
            />
            <ClaimsCard
              label='Approved Claims'
              claimsCount={approvedClaims?.length || 0}
              linkUrl="/claims/filter/approved"
              isLoading={approvedLoading}
            />
            <ClaimsCard
              label='Paid Claims'
              claimsCount={paidClaims?.length || 0}
              linkUrl="/claims/filter/paid"
              isLoading={paidLoading}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title m-b-15">Projects</h6>
              <hr/>
              <ul className="files-list">
                {projectsLoading && <Loading />}
                {projects && projects?.length > 0 && projects.map(item => (
                  <li key={item.id}>
                    <div className="files-cont">
                      <div className="file-type">
                        <span className="files-icon"><i className="fa fa-project"></i></span>
                      </div>
                      <div className="files-info">
                        <span className="file-name text-ellipsis">{item.name}</span>
                        <span className="file-author"><small>{ item.code }</small></span>
                      </div>
                    </div>
                  </li>
                ))}
                { projects?.length === 0 && <li>You are not on any project yet.</li>}
              </ul>
            </div>
          </div> 
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title m-b-15">
                Latest Claims
                <small className="float-right">
                  <Link to="/claims">View All</Link>
                </small>
              </h6>
              <hr/>
              
              {!isLoading && claims && <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Invoice No</th>
                      <th>Created</th>
                      <th>Due Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((claim) => 
                    <tr key={claim.id}>
                      <td><Link to={`/claims/${claim.id}`}>{ claim.claim_id }</Link></td>
                      <td>#{ claim.invoice_no }</td>
                      <td>{ toDateString(claim.created_at) }</td>
                      <td>{ claim.due_date ? toDateString(claim.due_date) : '-' }</td>
                      <td>{ Number(claim.amount).toLocaleString() }</td>
                      <td>{ claim.status }</td>
                    </tr>)}
                  </tbody>
                </table>
              </div> }
              {!isLoading && claims && claims.length === 0 && <p>You have no claims.</p>}
            </div>
          </div> 
        </div>
      </div>
    </>
  );
}

export default UserDashboard;