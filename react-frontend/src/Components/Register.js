import React from 'react';
import axios from 'axios';
import { authUser } from '../Helper/auth';
import { connect } from 'react-redux';
import { signInUser } from '../Store/userActions';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		axios
			.post('http://localhost:8080/register', {
				username: this.state.username,
				password: this.state.password,
				role: 'USER',
				enabled: 1
			})
			.then((res) => {
				authUser(this.state.username, this.state.password)
					.then((res) => {
						this.props.signInUser(res.user, res.token);
						this.props.history.push('/');
					})
					.catch((error) => console.log(error));
			});
	}

	render() {
		return (
			<div className="containerLogin">
				<div className="left">
					<div className="header">
						<h2 className="animation a1">Welcome</h2>
						<h4 className="animation a2">Register your account here</h4>
					</div>
					<form onSubmit={this.handleSubmit}>
						<div className="form">
							<input
								type="text"
								value={this.state.username}
								className="form-field animation a3"
								placeholder="Username"
								name="username"
								onChange={this.handleChange}
							/>
							<input
								type="password"
								className="form-field animation a4"
								placeholder="Password"
								value={this.state.password}
								name="password"
								onChange={this.handleChange}
							/>
							<button className="animation a6">Register</button>
							<a className="animation a6" href="/login">
								Already have an account yet
							</a>
						</div>
					</form>
				</div>
				<div className="right" />
			</div>
		);
	}
}
function mapStateToProp(state) {
	return {
		currentUser: state.currentUser
	};
}
export default connect(mapStateToProp, { signInUser })(Register);
