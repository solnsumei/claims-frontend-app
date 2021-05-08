import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams, Redirect, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import { useFetchQuery } from '../../../hooks/useApi';
import { useAuthUser } from '../../../hooks/userHook';
import types from '../../../utils/types';
import { toDateString } from '../../../utils/dateHelpers';
import Invoice from './Invoice';
// import ProjectForm from '../ProjectForm';


const ClaimDetails = () => {
  const { id } = useParams();
  const adminUpdatableStatuses = ["Pending", "Initial Approval", "Approved"];
  const managerUpdatableStatuses = ["Pending", "Initial Approval"];
  const queryClient = useQueryClient();
  const [showFormModal, setFormModalVisibility] = useState(false);
  const [showInvoice, setInvoiceVisibility] = useState(false);
  

  const { data: claim, isLoading, isError } = useFetchQuery({ key: [types.CLAIMS, id], url: `/claims/${id}` });
  const { data: user } = useAuthUser();


  return (
    <>
      <PageHeader
        title={claim?.claim_id || 'Claim Details'}
        subtitle="Claims"
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
				 							<ul className="list-unstyled">
												<li><h5><strong>{claim?.user?.name}</strong></h5></li>
												<li>{claim?.user?.email}</li>
												<li>Designation: {claim?.user?.role}</li>
												<li>Username: {claim?.user?.username}</li>
											</ul>
										</div>
										<div className="col-sm-6 m-b-20">
											<div className="invoice-details">
												<h3 className="text-uppercase">Invoice #{claim?.invoice_no}</h3>
												<ul className="list-unstyled">
													<li>Date: <span>{claim && claim.created_at ? toDateString(claim.created_at) : '-'}</span></li>
													<li>Due date: <span>{claim && claim?.due_date ? toDateString(claim.due_date) : '-'}</span></li>
                          { claim && claim.status === "Approved" && <li>Payment date: <span>{toDateString(claim.payment_date)}</span></li>}
												</ul>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6 col-lg-5 m-b-20">
                    <span className="text-muted">Details:</span>
											<ul className="list-unstyled invoice-payment-details">
                      { claim && claim.department && <li><h5>Invoiced to: <span className="text-right"><strong>{claim.department.name}</strong></span></h5></li>}
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
																	<td className="text-right">#{claim?.amount}</td>
																</tr>
																<tr>
																	<th>Total Due:</th>
																	<td className="text-right text-primary"><h5>#{claim?.amount}</h5></td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
										
										</div>
									</div>
                  { user && (user.is_admin || user.role === "Admin") && <div>
										<div className="invoice-info">
                      <p className="text-right">
                        { claim && adminUpdatableStatuses.includes(claim.status) && <> <button className="btn btn-primary">
                            Approve
                        </button> 
                        &nbsp;
                        <button className="btn btn-danger">
                            Reject
                        </button> 
                      </>}
                      </p>
										</div>
									</div> }
                  { user && user.role === "Manager" && <div>
										<div className="invoice-info">
                      <p className="text-right">
                        { claim && managerUpdatableStatuses.includes(claim.status) && <> <button className="btn btn-primary">
                            Approve
                        </button> 
                        &nbsp;
                        <button className="btn btn-danger">
                            Reject
                        </button> 
                      </>}
                      </p>
										</div>
									</div> }
								</div>
							</div>
						</div>
					</div>
      }

      {claim && showInvoice && <Invoice
        invoiceUrl={`http://localhost:5000/${claim.file_url}`}
        closeModal={() => setInvoiceVisibility(false)}
      />}
    </>
  );
}

export default ClaimDetails;