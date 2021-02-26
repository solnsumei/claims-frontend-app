import { Link } from 'react-router-dom';


const DepartmentItem = ({ department, index, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{ index + 1 }</td>
      <td>{ department.name }</td>
      <td className="text-right">
        <div className="dropdown dropdown-action">
          <Link to="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item" to="#"
              onClick={() => onEdit(department)}>
                <i className="fa fa-pencil m-r-5"></i> Edit
            </Link>
            <Link
              className="dropdown-item" to="#"
              onClick={() => onDelete(department)}>
              <i className="fa fa-trash-o m-r-5"></i> Delete
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default DepartmentItem;