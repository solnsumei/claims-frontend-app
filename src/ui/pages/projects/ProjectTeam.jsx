import { Link } from 'react-router-dom';


const ProjectTeam = ({ teamMembers, onRemove }) => {
  return (
    <>
      <div className="card-body">
        <ul className="files-list">
          {teamMembers && teamMembers?.length > 0 && teamMembers.map(item => (
            <li key={item.id}>
              <div className="files-cont">
                <div className="file-type">
                  <span className="files-icon"><i className="fa fa-user"></i></span>
                </div>
                <div className="files-info">
                  <span className="file-name text-ellipsis">{item.name}</span>
                  <span className="file-author"><small>{ item.role === 'Contractor' ? 'Contractor' : 'Employee'}</small></span>
                </div>
                <ul className="files-action">
                  <li className="dropdown dropdown-action">
                    <Link to="#" className="dropdown-toggle btn btn-link" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></Link>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item" to={`/${item.role === 'Contractor' ? 'contractors' : 'employees'}/${item.id}`}>
                        <i className="fa fa-eye m-r-5"></i> View Profile
                      </Link>
                      <Link
                        className="dropdown-item" to="#"
                        onClick={() => onRemove([item.id], 'remove')}>
                        <i className="fa fa-trash-o m-r-5"></i> Remove
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          ))}
          { teamMembers?.length === 0 && <li>No Item added yet</li>}
        </ul>
      </div>
    </>
  );
}

export default ProjectTeam;