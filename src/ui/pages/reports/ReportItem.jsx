import { Link } from 'react-router-dom';
import { toDateString } from '../../../utils/dateHelpers';

const ReportItem = ({ claim, index  }) => {
  return (
    <tr>
      <td>{ index + 1 }</td>
      <td><Link to={`/claims/${claim.id}`}>{ claim.claim_id }</Link></td>
      <td>#{ claim.invoice_no }</td>
      <td>{ toDateString(claim.created_at) }</td>
      <td>{ claim.due_date ? toDateString(claim.due_date) : '-' }</td>
      <td>{ Number(claim.amount).toLocaleString() }</td>
      <td>{ claim.status }</td>
    </tr>
  );
}

export default ReportItem;