import $ from 'jquery';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import ClaimList from './ClaimList';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import { headingTitle } from '../../../utils/claimHelpers';


const ClaimsPage = () => {
  const { status } = useParams();
  const history = useHistory();

  const { data, isLoading } = useFetchQuery({ key: status ? [types.CLAIMS, status] : types.CLAIMS, url: `/claims${status ? '?status='+status : ''}` });
  useFetchQuery({ key: types.MY_PROJECTS, url: '/user/projects' });

  useEffect(() => {
    if (data && !$.fn.DataTable.isDataTable('#claims-table')) {
      $('#claims-table').DataTable({ "pageLength": 50 });
    }
  }, [data, isLoading]);

  return (
    <section>
      <PageHeader
        title={`${status ? headingTitle(status) : "Claims"}`}
        buttonTitle="Create Claim"
        onClick={() => {
          history.push('/claims/new');
        }}
      />

      {isLoading && <p>Loading...</p>}

      { data && <ClaimList key={status || 'claims'}
        claimsList={data} tableId="claims-table"
      />}
    </section>
  );
}

export default ClaimsPage;