import { Link } from 'react-router-dom';
import { toDateString } from '../../../utils/dateHelpers';

const ProjectClaimItem = ({ claim }) => {
  return (
    <tr>
      <td><Link to={`/claims/${claim.id}`}>{ claim.claim_id }</Link></td>
      <td>#{ claim.invoice_no }</td>
      <td>{ claim.user.name }</td>
      <td>{ toDateString(claim.created_at) }</td>
      <td>{ Number(claim.amount).toLocaleString() }</td>
      <td>{ claim.status }</td>
    </tr>
  );
}

export default ProjectClaimItem;