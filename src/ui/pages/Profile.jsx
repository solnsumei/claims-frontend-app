import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuthUser } from '../../hooks/userHook';
import { toDateString } from '../../utils/dateHelpers';


const Profile = () => {
  const { data: user, isLoading } = useAuthUser();

  return (
    <>
      <PageHeader
        title='Profile'
      />

      { isLoading && <p>Loading...</p>}

      {user && <><div className="card mb-0">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-view">
                <div className="profile-img-wrap">
                  <div className="avatar">
                    <i className="fa fa-user fa-3x"></i>
                  </div>
                </div>
                <div className="profile-basic">
                  <div className="row">
                    <div className="col-md-12">
                      <div>
                        <h3 className="user-name m-t-0 mb-0">{user.name}</h3>


                        <div className="staff-id">Designation : {user.role}</div>
                        <div className="small doj text-muted">Created Date : {toDateString(user.created_at)}</div>
                        <div className="staff-msg"><Link className="btn btn-custom" to="/change-password">Change Password</Link></div>
                      </div>

                      <br /><hr /><br />

                      <ul className="personal-info">
                        <li>
                          <div className="title">Email:</div>
                          <div className="text">{user.email}</div>
                        </li>
                        { user && user.role !== 'Contractor' && <li>
                          <div className="title">Department:</div>
                          <div className="text">{user.department?.name || '-'}</div>
                        </li>}
                        <li>
                          <div className="title">Status:</div>
                          <div className="text">{user.status}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>}
    </>
  );
}

export default Profile;