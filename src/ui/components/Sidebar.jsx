import $ from 'jquery';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../providers/auth';
import AdminLinks from './AdminLinks';
import StaffLinks from './StaffLinks';


const Sidebar = () => {
	const { isAuthenticated } = useAuth();
	const { username, isAdmin } = isAuthenticated();

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
							<li>
								<Link to="/"><i className="fa fa-dashboard"></i> <span> Dashboard</span> </Link>
							</li>
							{isAdmin
								? <AdminLinks />
								: <StaffLinks />}
						</ul>
					</div>
				</div>
			</div>)}
		</>
	);
}

export default Sidebar;