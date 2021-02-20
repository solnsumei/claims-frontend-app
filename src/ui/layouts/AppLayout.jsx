import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


const AppLayout = ({ children }) => {
	return (
		<div className="main-wrapper">
			<Header />
			<Sidebar />
			<div className="page-wrapper">
				<div className="content container-fluid">
					<section>{children}</section>
				</div>
			</div>
		</div>
	);
}

export default AppLayout;