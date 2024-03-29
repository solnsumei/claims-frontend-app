import { Link } from 'react-router-dom';
import { toDateString } from '../../../utils/dateHelpers';

const ClaimItem = ({ claim, onEdit, onDelete }) => {
  return (
    <tr>
      <td><Link to={`/claims/${claim.id}`}>{ claim.claim_id }</Link></td>
      <td>#{ claim.invoice_no }</td>
      <td>{ claim.user.name }</td>
      <td>{ claim.project.name }</td>
      <td>{ toDateString(claim.created_at) }</td>
      <td>{ claim.due_date ? toDateString(claim.due_date) : '-' }</td>
      <td>{ Number(claim.amount).toLocaleString() }</td>
      <td>{ claim.status }</td>
      <td className="text-right">
        <div className="dropdown dropdown-action">
          <Link to="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <i className="material-icons">more_vert</i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to={`/claims/${claim.id}`}>
                <i className="fa fa-eye m-r-5"></i> View
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default ClaimItem;