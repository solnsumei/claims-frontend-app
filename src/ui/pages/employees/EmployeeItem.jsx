import { Link } from 'react-router-dom';
import types from '../../../utils/types';


const EmployeeItem = ({ role, employee, index, onEdit, onDelete }) => {

  return (
    <tr>
      <td>{ index + 1 }</td>
      <td>{role !== types.MANAGER 
        ? <Link to={`/employees/${employee.id}`}>{ employee.name }</Link>
        : `${employee.name}`}
      </td>
      <td>{ employee.email }</td>
      <td>{ employee.role }</td>
      <td>{ employee.department?.name }</td>
      <td>{ employee.status }</td>
      <td className="text-right">
        { role !== types.MANAGER && <div className="dropdown dropdown-action">
          <Link to="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <i className="material-icons">more_vert</i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item" to="#"
              onClick={() => onEdit(employee)}>
                <i className="fa fa-pencil m-r-5"></i> Edit
            </Link>
            <Link
              className="dropdown-item" to="#"
              onClick={() => onDelete(employee)}>
              <i className="fa fa-trash-o m-r-5"></i> Delete
            </Link>
          </div>
        </div>}
      </td>
    </tr>
  );
}

export default EmployeeItem;