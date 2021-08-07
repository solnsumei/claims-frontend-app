import UserClaimItem from './UserClaimItem';


const UserClaimsList = ({ claimsList }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
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
                  ? claimsList.map((item) => 
                    <UserClaimItem
                      key={item.id}
                      claim={item}
                    />)
                  : <tr><td colSpan='7'>No item to display.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserClaimsList;