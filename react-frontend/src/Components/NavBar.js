import React, { Component } from 'react';
import '../Styling/Nav.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../Store/userActions';
import { withRouter } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';

class NavBar extends Component {
	handleClick = () => {
		this.props.logOutUser();
		this.props.history.push('/login');
	};

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				{/* <div className="container justify-content-between"> */}
				{/* <div className="d-flex"> */}
				<NavLink className="navbar-brand" to="/">
					Webstore
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink exact className="nav-link" to="/" activeClassName="active">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink exact className="nav-link" to="/products" activeClassName="active">
								Products
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink exact className="nav-link" to="/contact" activeClassName="active">
								Contact Us
							</NavLink>
						</li>
						{this.props.isAdmin && (
							<li className="nav-item">
								<NavLink exact className="nav-link" to="/adminproducts" activeClassName="active">
									AddProducts
								</NavLink>
							</li>
						)}
					</ul>
					<ul className="navbar-nav">
						{this.props.currentUser ? (
							<div className="d-flex align-items-center">
								<IconButton
									aria-label="cart"
									className="mr-2"
									onClick={() => this.props.history.push('/cart')}
								>
									<Badge badgeContent={this.props.itemCount} color="secondary">
										<ShoppingCart style={{ color: 'white' }} />
									</Badge>
								</IconButton>
								<li className="nav-item">
									<button id="logout-btn" className="nav-link" onClick={this.handleClick}>
										Logout
									</button>
								</li>
								{/* <li className="nav-item">{this.props.username}</li> */}
							</div>
						) : (
							<li className="nav-item">
								<NavLink exact activeClassName="active" className="nav-link" to="/login">
									Login
								</NavLink>
							</li>
						)}
					</ul>
				</div>
				{/* </div> */}
			</nav>
		);
	}
}

function mapStateToProp(state) {
	const { itemCount } = state.cartReducer;
	const { user, isAuthenticated } = state.userReducer;
	return {
		isAdmin: user.isAdmin,
		// username: user.user.username,
		currentUser: isAuthenticated,
		itemCount
	};
}
export default withRouter(connect(mapStateToProp, { logOutUser })(NavBar));
