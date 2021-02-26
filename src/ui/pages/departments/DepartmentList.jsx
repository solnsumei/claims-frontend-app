import DepartmentItem from './DepartmentItem';


const DepartmentList = ({ departmentList, editItem, deleteItem }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div>
            <table className="table table-striped custom-table mb-0">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th>Department Name</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {departmentList && departmentList.length > 0
                  ? departmentList.map((department, i) => 
                    <DepartmentItem
                      key={department.id}
                      department={department} index={i}
                      onEdit={editItem}
                      onDelete={deleteItem}
                    />)
                  : <tr><td colSpan='3'>No item to display.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepartmentList;