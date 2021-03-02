import { useState } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import { toDateString } from '../../../utils/dateHelpers';
import ProjectForm from './ProjectForm';


const ProjectDetails = () => {
  const { id } = useParams();

  const { data: project, isLoading, isError } = useFetchQuery({ key: [types.PROJECTS, id], url: `/projects/${id}` })
  const [showFormModal, setFormModalVisibility] = useState(false);
  const [selectedItem, setItem] = useState(null);


  const showForm = (item) => {
    setItem(item);
    setFormModalVisibility(true);
  };

  const closeForm = (message=null) => {
    if (selectedItem) {
      setItem(null);
    }

    if (message) {
      toast.success(message);
    }
    
    setFormModalVisibility(false);
  };

  return (
    <>
      <PageHeader
        title={project?.name || 'Project Details'}
        subtitle="Projects"
        buttonTitle="Edit Project"
        onClick={showForm}
      />

      {isLoading && <p>Loading...</p>}
      {isError && <Redirect to="/projects" />}

      <ToastContainer />
      
      {project && <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="project-title">
                <h5 className="card-title">{project.name}</h5>
              </div>
              <p>{project.description}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title m-b-20">Contractors</h5>
              <ul className="files-list">
                <li>
                  <div className="files-cont">
                    <div className="file-type">
                      <span className="files-icon"><i className="fa fa-file-pdf-o"></i></span>
                    </div>
                    <div className="files-info">
                      <span className="file-name text-ellipsis"><Link to="#">AHA Selfcare Mobile Application Test-Cases.xls</Link></span>
                      <span className="file-author"><Link to="#">Richard Miles</Link></span> <span className="file-date">May 31st at 6:53 PM</span>
                      <div className="file-size">Size: 14.8Mb</div>
                    </div>
                    <ul className="files-action">
                      <li className="dropdown dropdown-action">
                        <Link to="#" className="dropdown-toggle btn btn-link" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_horiz</i></Link>
                        <div className="dropdown-menu dropdown-menu-right">
                          <Link className="dropdown-item" to="#">Download</Link>
                          <Link className="dropdown-item" to="#">Share</Link>
                          <Link className="dropdown-item" to="#">Delete</Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title m-b-15">Project details</h6>
              <table className="table table-striped table-border">
                <tbody>
                  <tr>
                    <td>Project Code:</td>
                    <td className="text-right">{project.code}</td>
                  </tr>
                  <tr>
                    <td>Budget:</td>
                    <td className="text-right">N{project.budget}</td>
                  </tr>
                  {project?.department && <tr>
                    <td>Department:</td>
                    <td className="text-right">{project.department.name}</td>
                    </tr>
                  }
                  <tr>
                    <td>Created:</td>
                    <td className="text-right">{toDateString(project.created_at)}</td>
                  </tr>
                  <tr>
                    <td>Duration:</td>
                    <td className="text-right">{project.duration} Month(s)</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td className="text-right">{project.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card project-user">
            <div className="card-body">
              <h6 className="card-title m-b-20">Project manager</h6>
              <ul className="list-box">
                <li>
                  <Link to={`/users/${project.manager.id}`}>
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar"><i className="fa fa-user"></i></span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">{project.manager?.name}</span>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>}

      <ProjectForm
        isOpen={showFormModal}
        closeModal={closeForm}
        project={project}
      />
    </>
  );
}

export default ProjectDetails;