import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addProduct, deleteProduct } from '../Store/cartActions';
import ProductCard from './ProductCard';

import '../Styling/Product.css';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = { products: [] };
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.loadProducts();
	}

	loadProducts = () => {
		axios
			.get('http://localhost:8080/product/')
			.then((res) => {
				this.setState({ products: [ ...res.data ] });
			})
			.catch((error) => console.log(error));
	};

	handleDelete(productID) {
		axios.get(`http://localhost:8080/product/delete/${productID}`);
		this.setState((prevState) => {
			return {
				products: prevState.products.filter((product) => product.productID !== productID)
			};
		});
	}

	render() {
		const products = this.state.products.map((product) => {
			return (
				<ProductCard
					deleteProduct={this.handleDelete}
					addProduct={this.props.addProduct}
					id={product.productID}
					image={product.image}
					name={product.name}
					price={product.price}
					description={product.description}
					key={product.productID}
					isAdmin={this.props.isAdmin}
					loadProducts={this.loadProducts}
				/>
			);
		});
		return (
			<div className="container mt-2 mb-5 ">
				<h1 className="display-5 mb-3">Products</h1>
				<div className="inner-container">{products}</div>
			</div>
		);
	}
}

function mapStateToProp(state) {
	const { total, itemCount, cartItems, checkout } = state.cartReducer;
	const { isAdmin } = state.userReducer.user;
	return {
		total,
		itemCount,
		cartItems,
		checkout,
		isAdmin
	};
}

export default connect(mapStateToProp, { addProduct, deleteProduct })(Product);
