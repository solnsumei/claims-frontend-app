import { useState } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import { toDateString } from '../../../utils/dateHelpers';
import EmployeeForm from './EmployeeForm';
import UserTabs from '../../components/UserTabs';


const EmployeeDetails = () => {
  const { id } = useParams();

  const { data: employee, isLoading, isError } = useFetchQuery({ key: [types.EMPLOYEES, id], url: `/users/${id}` })
  const [showFormModal, setFormModalVisibility] = useState(false);
  const [selectedItem, setItem] = useState(null);


  const showForm = (item) => {
    setItem(item);
    setFormModalVisibility(true);
  };

  const closeForm = () => {
    if (selectedItem) {
      setItem(null);
    }
    setFormModalVisibility(false);
  };

  return (
    <>
      <PageHeader
        title='Employee Details'
        subtitle="Employees"
      />

      {isLoading && <p>Loading...</p>}
      {isError && <Redirect to="/employees" />}

      {employee && <><div className="card mb-0">
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
                    <div className="col-md-5">
                      <div className="profile-info-left">
                        <h3 className="user-name m-t-0 mb-0">{employee.name}</h3>


                        <div className="staff-id">Employee ID : {employee.email}</div>
                        <div className="small doj text-muted">Created Date : {toDateString(employee.created_at)}</div>
                        <div className="staff-msg"><button className="btn btn-custom">Deactivate</button></div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <ul className="personal-info">
                        <li>
                          <div className="title">Role:</div>
                          <div className="text">{employee.role}</div>
                        </li>
                        <li>
                          <div className="title">Email:</div>
                          <div className="text">{employee.email}</div>
                        </li>
                        <li>
                          <div className="title">Department:</div>
                          <div className="text">{employee.department?.name || '-'}</div>
                        </li>
                        <li>
                          <div className="title">Status:</div>
                          <div className="text">{employee.status}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="pro-edit"><Link className="edit-icon" to="#" onClick={showForm}><i className="fa fa-pencil"></i></Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserTabs employee={employee} />
      </>}

      <EmployeeForm
        isOpen={showFormModal}
        closeModal={closeForm}
        user={employee}
      />
    </>
  );
}

export default EmployeeDetails;