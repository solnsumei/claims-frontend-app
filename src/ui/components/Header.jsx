import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="header">
				<div className="header-left">
					<Link to="/" className="logo">
						<img src="logo.png" alt="CLA" className="logo-img"/>
					</Link>
				</div>
				<span id="toggle_btn">
					<span className="bar-icon">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</span>

				<div className="page-title-box">
					<h3>Claims App</h3>
				</div>

				<a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars"></i></a>

				<ul className="nav user-menu">

					<li className="nav-item">
						<div className="top-nav-search">
							<form action="search.html">
								<input className="form-control" type="text" placeholder="Search here" />
								<button className="btn" type="submit"><i className="fa fa-search"></i></button>
							</form>
						</div>
					</li>

					<li className="nav-item dropdown">
						<Link to="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
							<i className="fa fa-comment-o"></i> <span className="badge badge-pill">8</span>
						</Link>
						<div className="dropdown-menu notifications">
							<div className="topnav-dropdown-header">
								<span className="notification-title">Messages</span>
								<button to="#" className="clear-noti"> Clear All </button>
							</div>
							<div className="noti-content">
								<ul className="notification-list">
									<li className="notification-message">
										<a href="chat.html">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-09.jpg" />
													</span>
												</div>
												<div className="list-body">
													<span className="message-author">Richard Miles </span>
													<span className="message-time">12:28 AM</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="chat.html">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-02.jpg" />
													</span>
												</div>
												<div className="list-body">
													<span className="message-author">John Doe</span>
													<span className="message-time">6 Mar</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="chat.html">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-03.jpg" />
													</span>
												</div>
												<div className="list-body">
													<span className="message-author"> Tarah Shropshire </span>
													<span className="message-time">5 Mar</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="chat.html">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-05.jpg" />
													</span>
												</div>
												<div className="list-body">
													<span className="message-author">Mike Litorus</span>
													<span className="message-time">3 Mar</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="chat.html">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-08.jpg" />
													</span>
												</div>
												<div className="list-body">
													<span className="message-author"> Catherine Manseau </span>
													<span className="message-time">27 Feb</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</li>
					<li className="nav-item dropdown has-arrow main-drop">
						<Link to="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
							<span className="user-img"><img src="assets/img/profiles/avatar-21.jpg" alt="" />
								<span className="status online"></span></span>
							<span>Admin</span>
						</Link>
						<div className="dropdown-menu">
							<Link className="dropdown-item" to="/profile">My Profile</Link>
							<Link className="dropdown-item" to="/settings">Settings</Link>
							<Link className="dropdown-item" to="/login">Logout</Link>
						</div>
					</li>
				</ul>
				<div className="dropdown mobile-user-menu">
					<Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></Link>
					<div className="dropdown-menu dropdown-menu-right">
						<Link className="dropdown-item" to="/profile">My Profile</Link>
						<Link className="dropdown-item" to="/settings">Settings</Link>
						<Link className="dropdown-item" to="/login">Logout</Link>
					</div>
				</div>
			</div>
  );
}
 
export default Header;