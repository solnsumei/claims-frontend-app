import ProjectClaimItem from './ProjectClaimItem';


const ClaimList = ({ claimsList, editItem, deleteItem }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-striped custom-table mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Inv. No</th>
                  <th>By</th>
                  <th>Created</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {claimsList && claimsList.length > 0
                  ? claimsList.map((item) => 
                    <ProjectClaimItem
                      key={item.id}
                      claim={item}
                    />)
                  : <tr><td colSpan='6'>No item to display.</td></tr>
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