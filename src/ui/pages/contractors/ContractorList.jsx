import ContractorItem from './ContractorItem';


const ContractorList = ({ contractorList, editItem, deleteItem }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div>
            <table className="table table-striped custom-table mb-0">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {contractorList && contractorList.length > 0
                  ? contractorList.map((item, i) => 
                    <ContractorItem
                      key={item.id}
                      contractor={item} index={i}
                      onEdit={editItem}
                      onDelete={deleteItem}
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

export default ContractorList;