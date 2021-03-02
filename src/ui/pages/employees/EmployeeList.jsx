import EmployeeItem from './EmployeeItem';


const EmployeeList = ({ employeeList, editItem, deleteItem }) => {
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
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeList && employeeList.length > 0
                  ? employeeList.map((item, i) => 
                    <EmployeeItem
                      key={item.id}
                      employee={item} index={i}
                      onEdit={editItem}
                      onDelete={deleteItem}
                    />)
                  : <tr><td colSpan='8'>No item to display.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeList;