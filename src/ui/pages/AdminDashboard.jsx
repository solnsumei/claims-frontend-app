
import { useFetchQuery } from '../../hooks/useApi';
import types from '../../utils/types';
import TopCard from '../components/TopCard';
import ClaimsCard from '../components/ClaimsCard';


const Home = () => {
  const { data: projects, isLoading: projectsLoading } = useFetchQuery({ key: types.PROJECTS, url: '/projects/' });
  const { data: employees, isLoading: employeesLoading } = useFetchQuery({ key: types.EMPLOYEES, url: '/users/' })
  const { data: contractors, isLoading: contractorsLoading } = useFetchQuery({ key: types.CONTRACTORS, url: '/users/?contractors=true' })
  const { data: departments, isLoading: departmentsLoading } = useFetchQuery({ key: types.DEPARTMENTS, url: '/departments/' })

  const { data: pendingClaims, isLoading: pendingLoading } = useFetchQuery({ key: [types.CLAIMS, 'pending'], url: "/claims?status=pending" });
  const { data: verifiedClaims, isLoading: verifiedLoading } = useFetchQuery({ key: [types.CLAIMS, 'verified'], url: "/claims?status=verified" });
  const { data: approvedClaims, isLoading: approvedLoading } = useFetchQuery({ key: [types.CLAIMS, 'approved'], url: "/claims?status=approved" });
  const { data: paidClaims, isLoading: paidLoading } = useFetchQuery({ key: [types.CLAIMS, 'paid'], url: "/claims?status=paid" });
  // const { data: dueClaims, isLoading: dueLoading } = useFetchQuery({ key: [types.CLAIMS, 'due'], url: "/claims?due=yes" });



  return (
    <>
      <div className="row">
        <TopCard title="Projects" value={projects?.length || 0} isLoading={projectsLoading} iconName="cubes" url={'/projects'}/>
        <TopCard title="Departments" value={departments?.length || 0} isLoading={departmentsLoading} iconName="briefcase" url={'/departments'}/>
        <TopCard title="Contractors" value={contractors?.length || 0} isLoading={contractorsLoading} iconName="users" url={'/contractors'} />
        <TopCard title="Employees" value={employees?.length || 0} isLoading={employeesLoading} iconName="users" url={'/employees'}/>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card-group m-b-30">
            <ClaimsCard
              label='Pending Claims'
              claimsCount={pendingClaims?.length || 0}
              linkUrl="/claims/filter/pending"
              isLoading={pendingLoading}
            />
            <ClaimsCard
              label='Verified Claims'
              claimsCount={verifiedClaims?.length || 0}
              linkUrl="/claims/filter/verified"
              isLoading={verifiedLoading}
            />
            <ClaimsCard
              label='Approved Claims'
              claimsCount={approvedClaims?.length || 0}
              linkUrl="/claims/filter/approved"
              isLoading={approvedLoading}
            />
            <ClaimsCard
              label='Paid Claims'
              claimsCount={paidClaims?.length || 0}
              linkUrl="/claims/filter/paid"
              isLoading={paidLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;