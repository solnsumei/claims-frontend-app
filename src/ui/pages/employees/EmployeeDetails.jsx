import { useState } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import { toDateString } from '../../../utils/dateHelpers';
import EmployeeForm from './EmployeeForm';


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
        title={employee?.name || 'Employee Details'}
        subtitle="Employees"
        buttonTitle="Edit Employee"
        onClick={showForm}
      />

      {isLoading && <p>Loading...</p>}
      {isError && <Redirect to="/employees" />}

      {employee && <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="employee-title">
                <h5 className="card-title">{employee.name}</h5>
              </div>
              <p>{employee.description}</p>
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
              <h6 className="card-title m-b-15">Employee details</h6>
              <table className="table table-striped table-border">
                <tbody>
                  <tr>
                    <td>Employee Code:</td>
                    <td className="text-right">{employee.code}</td>
                  </tr>
                  <tr>
                    <td>Budget:</td>
                    <td className="text-right">N{employee.budget}</td>
                  </tr>
                  {employee?.department && <tr>
                    <td>Department:</td>
                    <td className="text-right">{employee.department.name}</td>
                    </tr>
                  }
                  <tr>
                    <td>Created:</td>
                    <td className="text-right">{toDateString(employee.created_at)}</td>
                  </tr>
                  <tr>
                    <td>Duration:</td>
                    <td className="text-right">{employee.duration} Month(s)</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td className="text-right">{employee.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card employee-employee">
            <div className="card-body">
              <h6 className="card-title m-b-20">Employee manager</h6>
              <ul className="list-box">
                <li>
                  <Link to={`/employees/${employee.manager.id}`}>
                    <div className="list-item">
                      <div className="list-left">
                        <span className="avatar"><i className="fa fa-employee"></i></span>
                      </div>
                      <div className="list-body">
                        <span className="message-author">{employee.manager?.name}</span>
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

      <EmployeeForm
        isOpen={showFormModal}
        closeModal={closeForm}
        employee={employee}
      />
    </>
  );
}

export default EmployeeDetails;