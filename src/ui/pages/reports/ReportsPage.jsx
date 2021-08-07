import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import PageHeader from '../../components/PageHeader';
import ReportList from './ReportList';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import { fetchData } from '../../../services/apiService';
import { defaultDateValue, toServerDate, startOfMonthValue } from '../../../utils/dateHelpers';
import { reportResolver } from '../../../utils/validators';


const ReportsPage = () => {
  const queryClient = useQueryClient();
  const { search } = useLocation();

  const defaultQuery = `?start_date=${toServerDate(startOfMonthValue())}&end_date=${toServerDate(defaultDateValue())}&status=All`;
  const url = `/reports${ search.trim().length > 0 ? search : defaultQuery}`;

  let { data, isLoading } = useFetchQuery(
    { key: types.REPORTS, url });

  const { register, handleSubmit } = useForm({
    resolver: reportResolver(),
  });

  const mutation = useMutation(data => fetchData(`/reports?start_date=${data.start_date}&end_date=${data.end_date}&status=${data.status}` ));

  const submitForm = async (data) => {
    if (data.start_date !== undefined && data.start_date !== null) {
      data.start_date = toServerDate(data.start_date);
    }

    if (data.end_date !== undefined && data.end_date !== null) {
      data.end_date = toServerDate(data.end_date);
    }

    mutation.mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        queryClient.setQueryData(types.REPORTS, response);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  }

  return (
    <>
      <PageHeader
        title="Invoice Reports"
      />

      {isLoading && <p>Loading...</p>}

      <Form onSubmit={handleSubmit(submitForm)}>
      <div className="row filter-row">
        <div className="col-sm-6 col-md-3">
          <div className="form-group form-focus focused">
            <input
              className="form-control floating"
              type="date" {...register("start_date")} defaultValue={startOfMonthValue()}/>
            <label className="focus-label">From</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group form-focus focused">
            <input  {...register("end_date")}className="form-control floating" type="date" defaultValue={defaultDateValue()} />
            <label className="focus-label">To</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="form-group form-focus select-focus">
            <select className="form-control select floating" {...register("status")}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <label className="focus-label">Status</label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <button className="btn btn-success btn-block">Search </button>
        </div>
      </div>
      </Form>
      <ReportList 
        claimsList={data}
      />
    </>
  );
}

export default ReportsPage;