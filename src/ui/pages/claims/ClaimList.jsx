import $ from 'jquery';
import { useEffect } from 'react';
import ClaimItem from './ClaimItem';


const ClaimList = ({ claimsList, isLoading, editItem, deleteItem }) => {

  useEffect(() => {
    if (!isLoading) {
      $('#my-table').DataTable({
        "pageLength": 50
      });
    }
  }, [isLoading]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-striped custom-table mb-0" id="my-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Invoice No</th>
                  <th>Raised By</th>
                  <th>Project</th>
                  <th>Created</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {claimsList?.map(claim => <ClaimItem claim={claim} onEdit={editItem} onDelete={deleteItem} key={claim.id}/>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClaimList;