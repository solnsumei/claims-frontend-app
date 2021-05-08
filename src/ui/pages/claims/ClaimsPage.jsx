import $ from 'jquery';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ClaimList from './ClaimList';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';


const ClaimsPage = () => {

  const history = useHistory();

  const { data, isLoading } = useFetchQuery({ key: types.CLAIMS, url: '/claims/' });
  const { data: projects } = useFetchQuery({ key: types.MY_PROJECTS, url: '/user/projects' });

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
        onClick={() => {
          history.push('/claims/new');
        }}
      />

      {isLoading && <p>Loading...</p>}

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
      <ClaimList 
        claimsList={data}
      />
    </>
  );
}

export default ClaimsPage;