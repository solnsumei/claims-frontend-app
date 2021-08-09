import $ from 'jquery';
import { useEffect } from 'react';
import ContractorItem from './ContractorItem';
import { useAuth } from '../../../providers/auth';
import types from '../../../utils/types';


const ContractorList = ({ isLoading, contractorList, editItem, deleteItem }) => {
  const { isAuthenticated } = useAuth();
  const { role } = isAuthenticated();

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable('#my-table')) {
      $('#my-table').DataTable({ "pageLength": 25 });
    }
  }, [isLoading]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div>
            { contractorList && <table className="table table-striped custom-table mb-0" id="my-table">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="text-right">{role !== types.MANAGER ? 'Action' : ''}</th>
                </tr>
              </thead>
              <tbody>
                {contractorList?.map((item, i) => 
                    <ContractorItem
                      role={role}
                      key={item.id}
                      contractor={item} index={i}
                      onEdit={editItem}
                      onDelete={deleteItem}
                    />)
                }
              </tbody>
            </table>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContractorList;