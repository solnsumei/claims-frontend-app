import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams, Redirect, Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import { useFetchQuery } from '../../../hooks/useApi';
import { saveTeamMember } from '../../../services/apiService';
import types from '../../../utils/types';
import { toDateString } from '../../../utils/dateHelpers';
import ProjectForm from './ProjectForm';
import ProjectUsersForm from './ProjectUsersForm';
import ProjectTeam from './ProjectTeam'
import { getAvailableUsers } from '../../../utils/projectHelpers';
import { useAuth } from '../../../providers/auth';
import ProjectClaimList from './ProjectClaimList';


const ProjectDetails = () => {
  const { isAuthenticated } = useAuth();
  const { role } = isAuthenticated();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showMembersModal, setMembersModalVisibility] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [showFormModal, setFormModalVisibility] = useState(false);
  const [selectedItem, setItem] = useState(null);

  const { data: project, isLoading, isError } = useFetchQuery({
    key: [types.PROJECTS, id], url: `/projects/${id}`
  });
  const { data: claims, isLoading: claimsLoading } = useFetchQuery({
    key: [types.PROJECTS, 'claims'], url: `/projects/${id}/claims`
  });
  const { data: stats, isLoading: statsLoading } = useFetchQuery({
    key: [types.PROJECTS, 'stats'], url: `/projects/${id}/stats`
  });
  const { data: employees } = useFetchQuery({ key: types.EMPLOYEES, url: '/users/' });
  const { data: contractors } = useFetchQuery({ key: types.CONTRACTORS, url: '/users/?contractors=true' });

  useEffect(() => {
    if (project && employees && contractors) {
      setAvailableUsers(getAvailableUsers({ project, allUsers: employees.concat(contractors) }));
    }
  }, [project, employees, contractors]);

  const mutation = useMutation((data) => saveTeamMember({ id: project?.id, data }));

  const toggleMembersForm = () => {
    setMembersModalVisibility(!showMembersModal);
  }

  const updateTeamMembers = async (members, action) => {
    mutation.mutate({ user_ids: members, action }, {
      onSuccess: () => {
        queryClient.invalidateQueries([types.PROJECTS, project.id]);
        setMembersModalVisibility(false);
      },
      onError: (error) => {
        // console.log('error >>>>>>', error?.response?.data);
        toast.error(error?.response?.data?.detail);
      }
    });
  }

  const showForm = (item) => {
    setItem(item);
    setFormModalVisibility(true);
  };

  const closeForm = (message = null) => {
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
        buttonTitle={role !== types.MANAGER ? "Edit Project" : undefined}
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
            <div className="card-header">
              <h3 className="card-title mb-0">
                Team
                <button
                  className="float-right btn btn-primary btn-sm"
                  onClick={toggleMembersForm}>
                  <i className="fa fa-plus"></i> Add
              </button>
              </h3>
            </div>
            <ProjectTeam
              teamMembers={project?.team}
              onRemove={updateTeamMembers}
            />
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title mb-0">
                Claims
              </h3>
            </div>
            { !claimsLoading && claims && <ProjectClaimList claimsList={claims}/>}
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
                    <td className="text-right">
                    <h4>
                      <Badge pill className="bg-primary">
                        N{Number(project.budget).toLocaleString()}
                      </Badge>
                    </h4>
                      
                    </td>
                  </tr>
                  { !statsLoading && stats && <>
                    {stats.map(stat => <tr key={stat.status}>
                      <td>{stat.status} Claims:</td>
                      <td className="text-right">
                        <h4><Badge pill className={stat.status === 'Paid' ? "bg-success" : "bg-warning"}>
                          N{Number(stat.total).toLocaleString()}
                        </Badge>
                        </h4>
                      </td>
                    </tr>)}
                  </>}
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
          {role !== types.MANAGER && <div className="card project-user">
            <div className="card-body">
              <h6 className="card-title m-b-20">Project manager</h6>
              <ul className="list-box">
                <li>
                  <Link to={`/employees/${project.manager.id}`}>
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
          </div>}
        </div>
      </div>}

      {role !== types.MANAGER && project?.name && <ProjectForm
        isOpen={showFormModal}
        closeModal={closeForm}
        project={project}
      />}

      {project?.name && <ProjectUsersForm
        isOpen={showMembersModal}
        closeModal={toggleMembersForm}
        project={project}
        availableUsers={availableUsers}
        onSave={updateTeamMembers}
        loading={mutation.isLoading}
      />}
    </>
  );
}

export default ProjectDetails;