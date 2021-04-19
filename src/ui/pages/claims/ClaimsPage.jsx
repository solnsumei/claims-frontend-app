import $ from 'jquery';
import { useEffect } from 'react';
import PageHeader from '../../components/PageHeader';


const ClaimsPage = () => {

  useEffect(() => {
    // Select 2
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
  }, []);


  return (
    <>
      <PageHeader
        title="Claims"
        buttonTitle="Create Claim"
        onClick={() => {}}
      />

      <div className="row filter-row">
        <div className="col-sm-6 col-md-3">
          <div className="form-group form-focus focused">
            <input className="form-control floating" type="date" />
            <label className="focus-label">From</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group form-focus focused">
            <input className="form-control floating" type="date" />
            <label className="focus-label">To</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group form-focus select-focus">
            <select className="select floating">
              <option>Select Status</option>
              <option>Pending</option>
              <option>Paid</option>
              <option>Partially Paid</option>
            </select>
            <label className="focus-label">Status</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <button className="btn btn-success btn-block"> Search </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-striped custom-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice Number</th>
                  <th>Client</th>
                  <th>Created Date</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><a href="invoice-view.html">#INV-0001</a></td>
                  <td>Global Technologies</td>
                  <td>11 Mar 2019</td>
                  <td>17 Mar 2019</td>
                  <td>$2099</td>
                  <td><span className="badge bg-inverse-success">Paid</span></td>
                  <td className="text-right">
                    <div className="dropdown dropdown-action">
                      <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="edit-invoice.html"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                        <a className="dropdown-item" href="invoice-view.html"><i className="fa fa-eye m-r-5"></i> View</a>
                        <a className="dropdown-item" href="#"><i className="fa fa-file-pdf-o m-r-5"></i> Download</a>
                        <a className="dropdown-item" href="#"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><a href="invoice-view.html">#INV-0002</a></td>
                  <td>Delta Infotech</td>
                  <td>11 Mar 2019</td>
                  <td>17 Mar 2019</td>
                  <td>$2099</td>
                  <td><span className="badge bg-inverse-info">Sent</span></td>
                  <td className="text-right">
                    <div className="dropdown dropdown-action">
                      <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="edit-invoice.html"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                        <a className="dropdown-item" href="invoice-view.html"><i className="fa fa-eye m-r-5"></i> View</a>
                        <a className="dropdown-item" href="#"><i className="fa fa-file-pdf-o m-r-5"></i> Download</a>
                        <a className="dropdown-item" href="#"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><a href="invoice-view.html">#INV-0003</a></td>
                  <td>Cream Inc</td>
                  <td>11 Mar 2019</td>
                  <td>17 Mar 2019</td>
                  <td>$2099</td>
                  <td><span className="badge bg-inverse-warning">Partially Paid</span></td>
                  <td className="text-right">
                    <div className="dropdown dropdown-action">
                      <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="edit-invoice.html"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                        <a className="dropdown-item" href="invoice-view.html"><i className="fa fa-eye m-r-5"></i> View</a>
                        <a className="dropdown-item" href="#"><i className="fa fa-file-pdf-o m-r-5"></i> Download</a>
                        <a className="dropdown-item" href="#"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClaimsPage;