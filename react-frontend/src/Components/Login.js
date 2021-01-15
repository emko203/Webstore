import React from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../Store/userActions';
import { authUser } from '../Helper/auth';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import '../Styling/Login.css';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '', open: false };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		authUser(this.state.username, this.state.password)
			.then(res => {
				this.props.signInUser(res.user, res.token);
				this.props.history.push('/');
			})
			.catch(error =>
				this.setState({ open: true }, () => {
					setInterval(() => this.setState({ open: false }), 4000);
				})
			);
	}

	handleClose = e => {
		this.setState({ open: false });
	};

	render() {
		const { username, password, open } = this.state;
		return (
			<div className="containerLogin">
				<div className="left">
					<div className="header">
						<h2 className="animation a1">Welcome</h2>
						<h4 className="animation a2">
							Log in to your account using username and password
						</h4>
					</div>
					<form onSubmit={this.handleSubmit}>
						<div className="form">
							<input
								type="text"
								value={username}
								className="form-field animation a3"
								placeholder="Username"
								name="username"
								onChange={this.handleChange}
							/>
							<input
								type="password"
								className="form-field animation a4"
								placeholder="Password"
								value={password}
								name="password"
								onChange={this.handleChange}
							/>
							<button className="animation a6">LOGIN</button>
							<a className="animation a6" href="/register">
								Don't have an account yet
							</a>
						</div>
					</form>
				</div>
				<div className="right" />
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={open}
					onClose={this.handleClose}
					message="Incorrect Username/Password"
					action={
						<React.Fragment>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={this.handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
				/>
			</div>
		);
	}
}

export default connect(null, { signInUser })(Login);
