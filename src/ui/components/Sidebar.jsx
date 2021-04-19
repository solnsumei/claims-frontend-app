import $ from 'jquery';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../providers/auth';
import AdminLinks from './AdminLinks';


const Sidebar = () => {
	const { isAuthenticated } = useAuth();
	const { username, isAdmin } = isAuthenticated();
	const { pathname } = useLocation();

	useEffect(() => {
		$('#sidebar-menu a').on('click', function (e) {
			if ($(this).parent().hasClass('submenu')) {
				e.preventDefault();
			}
			if (!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
			} else if ($(this).hasClass('subdrop')) {
				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
			}
		});
		$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');

		// Mobile menu sidebar overlay

		const $wrapper = $('.main-wrapper');

		$('body').append('<div class="sidebar-overlay"></div>');

		$(document).on('click', '#mobile_btn', function () {
			$wrapper.toggleClass('slide-nav');
			$('.sidebar-overlay').toggleClass('opened');
			$('html').addClass('menu-opened');
			$('#task_window').removeClass('opened');
			return false;
		});

		$(".sidebar-overlay").on("click", function () {
			$('html').removeClass('menu-opened');
			$(this).removeClass('opened');
			$wrapper.removeClass('slide-nav');
			$('.sidebar-overlay').removeClass('opened');
			$('#task_window').removeClass('opened');
		});

	}, []);

	return (
		<>
			{ username && (<div className="sidebar" id="sidebar">
				<div className="sidebar-inner">
					<div id="sidebar-menu" className="sidebar-menu">
						<ul>
							<li className="menu-title">
								<span>Main</span>
							</li>
							<li className={pathname === '/' ? 'active' : ''}>
								<Link to="/"><i className="fa fa-dashboard"></i> <span> Dashboard</span> </Link>
							</li>
							<li className={pathname === '/profile' ? 'active' : ''}>
								<Link to="/profile"><i className="fa fa-user"></i> <span> My Profile</span> </Link>
							</li>
							{isAdmin && <AdminLinks />}
							<li className="menu-title">
								<span>Accounts</span>
							</li>
							<li className="submenu">
								<Link to="#"><i className="fa fa-files-o"></i> <span> Claims </span> <span className="menu-arrow"></span></Link>
								<ul style={{ display: 'none' }}>
									<li><Link to="/claims/pending">Pending</Link></li>
									<li><Link to="/claims/approved">Approved</Link></li>
									<li><Link to="/claims/paid">Paid</Link></li>
									<li><Link to="/claims/cancelled">Cancelled</Link></li>
									<li><Link to="/claims">All</Link></li>
								</ul>
							</li>
							<li className="submenu">
								<Link to="#"><i className="fa fa-pie-chart"></i> <span> Reports </span> <span className="menu-arrow"></span></Link>
								<ul style={{ display: 'none' }}>
									<li><Link to="/reports/expense-reports"> Expense Report </Link></li>
									<li><Link to="reports/invoice-reports"> Invoice Report </Link></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>)}
		</>
	);
}

export default Sidebar;