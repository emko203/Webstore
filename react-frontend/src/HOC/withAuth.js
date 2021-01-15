import React from 'react';
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
	class Authenticate extends React.Component {
		componentDidMount() {
			if (this.props.isAuthenticated === false) {
				this.props.history.push('/login');
			}
		}

		componentDidUpdate(nextProps) {
			if (nextProps.isAuthenticated === false) {
				this.props.history.push('/login');
			}
		}

		render() {
			return <ComponentToBeRendered {...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: state.userReducer.isAuthenticated
		};
	}

	return connect(mapStateToProps)(Authenticate);
}
