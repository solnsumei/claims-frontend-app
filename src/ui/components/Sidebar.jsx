import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import $ from 'jquery';

const Sidebar = () => {

	useEffect(() => {
			$('#sidebar-menu a').on('click', function(e) {
				if($(this).parent().hasClass('submenu')) {
					e.preventDefault();
				}
				if(!$(this).hasClass('subdrop')) {
					$('ul', $(this).parents('ul:first')).slideUp(350);
					$('a', $(this).parents('ul:first')).removeClass('subdrop');
					$(this).next('ul').slideDown(350);
					$(this).addClass('subdrop');
				} else if($(this).hasClass('subdrop')) {
					$(this).removeClass('subdrop');
					$(this).next('ul').slideUp(350);
				}
			});
			$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');

			// Mobile menu sidebar overlay

	const $wrapper = $('.main-wrapper');
	
	$('body').append('<div class="sidebar-overlay"></div>');

	$(document).on('click', '#mobile_btn', function() {
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
    <div className="sidebar" id="sidebar">
				<div className="sidebar-inner">
					<div id="sidebar-menu" className="sidebar-menu">
						<ul>
							<li className="menu-title">
								<span>Main</span>
							</li>
							<li>
								<Link to="/"><i className="fa fa-dashboard"></i> <span> Dashboard</span> </Link>
							</li>
							<li className="menu-title">
								<span>Admin Menu</span>
							</li>
							<li>
								<Link to="/departments"><i className="fa fa-briefcase"></i> <span>Departments</span></Link>
							</li>
							<li>
								<Link to="/projects"><i className="fa fa-rocket"></i> <span>Projects</span></Link>
							</li>
							<li>
								<Link to="/employees"><i className="fa fa-user"></i> <span>Employees</span></Link>
							</li>
							<li>
								<Link to="/contractors"><i className="fa fa-users"></i> <span>Contractors</span></Link>
							</li>
							<li className="menu-title">
								<span>Accounts</span>
							</li>
							<li className="submenu">
								<Link to="#"><i className="fa fa-files-o"></i> <span> Invoices </span> <span className="menu-arrow"></span></Link>
								<ul style={{ display: 'none'}}>
									<li><Link to="/invoices/pending">Pending</Link></li>
									<li><Link to="/invoices/approved">Approved</Link></li>
									<li><Link to="/invoices/paid">Paid</Link></li>
									<li><Link to="/invoices/cancelled">Cancelled</Link></li>
								</ul>
							</li>
							<li className="submenu">
								<Link to="#"><i className="fa fa-pie-chart"></i> <span> Reports </span> <span className="menu-arrow"></span></Link>
								<ul style={{ display: 'none'}}>
									<li><Link to="/reports/expense-reports"> Expense Report </Link></li>
									<li><Link to="reports/invoice-reports"> Invoice Report </Link></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
  );
}
 
export default Sidebar;