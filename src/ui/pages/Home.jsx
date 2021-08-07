
import { useAuthUser } from '../../hooks/userHook';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';



const Home = () => {
  const { data, isLoading } = useAuthUser();

  return (
    <div>
      <PageHeader isHome={true} title={`Welcome ${data && data.name }`} />
      {isLoading && <Loading />}
      {data && (data.isAdmin || data.role === 'Admin') && <AdminDashboard />}
      {data && data.role !== 'Admin' && <UserDashboard />}
    </div>
  );
}

export default Home;