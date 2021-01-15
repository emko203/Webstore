import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import '../Styling/Chat.css';

class NodeChat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			msg: '',
			messages: []
		};
	}
	componentDidMount() {
		this.socket = io.connect('http://localhost:5000');

		this.socket.on('msg', ({ msg, user }) => {
			console.log(user);
			this.setState((state) => ({
				messages: [ ...state.messages, { text: msg, user } ]
			}));
		});
	}

	componentWillUnmount() {
		this.socket.removeAllListeners('msg');
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { user } = this.props;
		const { msg } = this.state;

		this.socket.emit('msg', { user, msg });

		this.setState({ msg: '' });
	};

	render() {
		const messages = this.state.messages.map((msg, i) => (
			<li key={i}>
				{msg.user}: {msg.text}
			</li>
		));
		return (
			<div id="chat-body">
				<div id="chat-title">
					<span>Contact Us</span>
				</div>
				<div id="chat-container">
					<ul className="list-group">{messages}</ul>
					<div id="chat-form">
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								placeholder="Send us a message"
								value={this.state.msg}
								onChange={(e) => this.setState({ msg: e.target.value })}
							/>
							<button>Send</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.userReducer.user.user.username
	};
}

export default connect(mapStateToProps)(NodeChat);
