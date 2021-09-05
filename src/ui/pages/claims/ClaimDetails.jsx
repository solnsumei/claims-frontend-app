import { useState} from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import { useFetchQuery } from '../../../hooks/useApi';
import { useAuthUser } from '../../../hooks/userHook';
import types from '../../../utils/types';
import { nextStatus } from '../../../utils/claimHelpers';
import { toDateString } from '../../../utils/dateHelpers';
import Invoice from './Invoice';
import RejectClaimForm from './RejectClaimForm';
import ClaimUpdateForm from './ClaimUpdateForm';


const ClaimDetails = () => {
	const history = useHistory();
  const { id } = useParams();
  const adminUpdatableStatuses = ["Pending", "Verified", "Approved"];
  const managerUpdatableStatuses = ["Pending"];
  const [showFormModal, setFormModalVisibility] = useState(false);
  const [showInvoice, setInvoiceVisibility] = useState(false);
	const [showRejectForm, setShowRejectForm] = useState(false);
  

  const { data: claim, isLoading, isError } = useFetchQuery({ key: [types.CLAIMS, id], url: `/claims/${id}` });
  const { data: user } = useAuthUser();

	const closeUpdateFormModal = (message=null) => {
    if (message) {
      toast.success(message);
    }
    setFormModalVisibility(false);
  };

  return (
    <>
      <PageHeader
        title={claim?.claim_id || 'Claim Details'}
        subtitle="Claims"
				isCloseButton={true}
				buttonTitle="Close"
				onClick={() => {
          history.replace("/claims");
        }}
      />

      {isLoading && <p>Loading...</p>}
      {isError && <Redirect to="/claims" />}

      <ToastContainer />

      {claim && <div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-sm-6 m-b-20">
				 							{ claim && user && claim.user.id !== user.id && <ul className="list-unstyled">
												<li><h5><strong>{claim?.user?.name}</strong></h5></li>
												<li>{claim?.user?.email}</li>
												<li>Designation: {claim?.user?.role}</li>
											</ul>}
										</div>
										<div className="col-sm-6 m-b-20">
											<div className="invoice-details">
												<h3 className="text-uppercase">Invoice #{claim?.invoice_no}</h3>
												<ul className="list-unstyled">
													<li>Date: <span>{claim.created_at ? toDateString(claim.created_at) : '-'}</span></li>
													<li>Due date: <span>{claim?.due_date ? toDateString(claim.due_date) : '-'}</span></li>
													{claim.tax_percent && <li>Witholding Tax: {claim.tax_percent}%</li>}
                          {claim.status === "Approved" && <li>Payment date: <span>{toDateString(claim.payment_date)}</span></li>}
												</ul>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6 col-lg-5 m-b-20">
                    <span className="text-muted">Details:</span>
											<ul className="list-unstyled invoice-payment-details">
                      {claim.department && <li><h5>Invoiced to: <span className="text-right"><strong>{claim.department.name} Dept</strong></span></h5></li>}
                        <li><h5>Project Name: <span className="text-right">{claim?.project?.name || '-'}</span></h5></li>
												<li><h5>Project Code: <span className="text-right">{claim?.project?.code || '-'}</span></h5></li>
                        <li>Status <span className="text-right">{claim?.status || '-'}</span></li>
											</ul>
										</div>
										<div className="col-sm-6 col-lg-7 m-b-20">
											<p className="text-right">
                        <button className="btn btn-primary" onClick={() => setInvoiceVisibility(true)}>
                          View Invoice
                        </button>
                      </p>
                      <div className="row invoice-payment">
											<div className="col-sm-4">
											</div>
											<div className="col-sm-8">
												<div className="m-b-20">
													<div className="table-responsive no-border">
														<table className="table mb-0">
															<tbody>
																<tr>
																	<th>Subtotal:</th>
																	<td className="text-right">#{Number(claim.amount).toLocaleString()}</td>
																</tr>
																<tr>
																	<th>WTH Tax:</th>
																	<td className="text-right">#{Number(claim.tax || 0.0).toLocaleString()}</td>
																</tr>
																<tr>
																	<th>Total Due:</th>
																	<td className="text-right text-primary"><h4>#{Number(claim.amount - (claim.tax || 0)).toLocaleString()}</h4></td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
										</div>
									</div>
								</div>
							</div>
							{ user && (user.is_admin || user.role === "Admin") && <div>
										<div className="invoice-info">
                      <p className="text-right">
                        { adminUpdatableStatuses.includes(claim.status) && <> <button
													className="btn btn-primary"
													onClick={() => setFormModalVisibility(true)}>
                            { nextStatus(claim).label }
                        </button> 
                        &nbsp;
                        <button className="btn btn-danger"
													onClick={() => setShowRejectForm(true)}>
                            Cancel
                        </button> 
                      </>}
                      </p>
										</div>
									</div> }
                  { user && user.role === "Manager" && <div>
										<div className="invoice-info">
                      <p className="text-right">
                        { managerUpdatableStatuses.includes(claim.status) && <> <button 
														className="btn btn-primary"
														onClick={() => setFormModalVisibility(true)}
														>
														 Verify
                        	</button>
                        &nbsp;
                        <button
													className="btn btn-danger"
													onClick={() => setShowRejectForm(true)}
													>
                            Cancel
                        </button> 
                      </>}
                      </p>
										</div>
									</div> }
						</div>
					</div>
      }

      {claim && showInvoice && <Invoice
        invoiceUrl={`${process.env.REACT_APP_DOMAIN}/${claim.file_url}`}
        closeModal={() => setInvoiceVisibility(false)}
      />}

			{claim && showRejectForm && <RejectClaimForm
        claim={claim}
        closeModal={() => setShowRejectForm(false)}
      />}

			{claim && showFormModal && <ClaimUpdateForm
        claim={claim}
        closeModal={closeUpdateFormModal}
      />}
    </>
  );
}

export default ClaimDetails;