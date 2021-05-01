import ClaimItem from './ClaimItem';


const ClaimList = ({ claimsList, editItem, deleteItem }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-striped custom-table mb-0">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th>ID</th>
                  <th>Invoice No</th>
                  <th>Created</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {claimsList && claimsList.length > 0
                  ? claimsList.map((item, i) => 
                    <ClaimItem
                      key={item.id}
                      claim={item} index={i}
                    />)
                  : <tr><td colSpan='9'>No item to display.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClaimList;