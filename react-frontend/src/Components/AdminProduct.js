import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';

class AdminProduct extends React.Component {
	constructor(props) {
		super(props);
		const { name, price, image, description } = this.props;
		this.state = {
			name: '' || name,
			price: 0 || price,
			image: '' || image,
			description: '' || description
		};
	}

	componentDidMount() {
		if (!this.props.isAdmin) this.props.history.push('/login');
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleEdit = (e) => {
		e.preventDefault();
		const { id } = this.props;
		const { name, price, image, description } = this.state;
		this.props.edit({
			productID: id,
			name,
			price,
			image,
			description
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:8080/product/new', {
				name: this.state.name,
				price: this.state.price,
				image: this.state.image,
				description: this.state.description
			})
			.then(() => {
				this.props.history.push('/products');
			});
	};

	render() {
		const { isEditing } = this.props;
		return (
			<form onSubmit={isEditing ? this.handleEdit : this.handleSubmit}>
				<div className="form">
					<div className="form-group">
						<div className="form-group">
							<FormControl>
								<InputLabel htmlFor="standard-adornment-amount">Product Name</InputLabel>
								<Input
									type="text"
									value={this.state.name}
									placeholder="Product Name"
									name="name"
									onChange={this.handleChange}
									id="standard-adornment-amount"
								/>
							</FormControl>
						</div>
						<div className="form-group">
							<FormControl>
								<InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
								<Input
									type="number"
									placeholder="Product Price"
									id="standard-adornment-amount"
									name="price"
									value={this.state.price}
									onChange={this.handleChange}
									startAdornment={<InputAdornment position="start">$</InputAdornment>}
								/>
							</FormControl>
						</div>
						<div className="form-group">
							<FormControl>
								<InputLabel htmlFor="standard-adornment-amount">Product Image</InputLabel>
								<Input
									type="url"
									id="standard-adornment-amount"
									placeholder="Image URL"
									name="image"
									value={this.state.image}
									onChange={this.handleChange}
								/>
							</FormControl>
						</div>
						<div className="form-group">
							<textarea
								value={this.state.description}
								placeholder="Add description here"
								name="description"
								onChange={this.handleChange}
							/>
						</div>
						<button>Submit</button>
					</div>
				</div>
			</form>
		);
	}
}
function mapStateToProp(state) {
	return {
		isAdmin: state.userReducer.user.isAdmin
	};
}
export default withRouter(connect(mapStateToProp)(AdminProduct));
