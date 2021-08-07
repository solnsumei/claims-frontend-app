import $ from 'jquery';
import { useEffect } from 'react';
import EmployeeItem from './EmployeeItem';
import { useAuth } from '../../../providers/auth';
import types from '../../../utils/types';


const EmployeeList = ({ isLoading, employeeList, editItem, deleteItem }) => {
  const { isAuthenticated } = useAuth();
  const { role } = isAuthenticated();

  useEffect(() => {
    if (!isLoading) {
      $('#my-table').DataTable({ "pageLength": 25 });
    }
  }, [isLoading]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div>
            <table className="table table-striped custom-table mb-0" id="my-table">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th className="text-right">{role !== types.MANAGER ? 'Action' : ''}</th>
                </tr>
              </thead>
              <tbody>
                {employeeList && employeeList.length > 0
                  && employeeList.map((item, i) => 
                    <EmployeeItem
                      role={role}
                      key={item.id}
                      employee={item} index={i}
                      onEdit={editItem}
                      onDelete={deleteItem}
                    />)
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