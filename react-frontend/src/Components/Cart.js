import React from 'react';
import { connect } from 'react-redux';
import { clearCart, handleCheckout, increase, decrease, removeProduct } from '../Store/cartActions';

import CartProducts from './CartProducts';
import { formatNumber } from '../Helper/utils';
import { Link } from 'react-router-dom';

const Cart = ({
	total,
	itemCount,
	checkout,
	cartItems,
	handleCheckout,
	clearCart,
	increase,
	decrease,
	removeProduct
}) => {
	return (
		<div>
			<div className="text-center mt-5">
				<h1>Cart</h1>
				<p>This is the Cart Page.</p>
			</div>

			<div className="row no-gutters justify-content-center">
				<div className="col-md-9 p-3">
					{cartItems.length > 0 ? (
						<CartProducts
							cartItems={cartItems}
							increase={increase}
							decrease={decrease}
							removeProduct={removeProduct}
						/>
					) : (
						<div className="p-3 text-center text-muted">Your cart is empty</div>
					)}

					{checkout && (
						<div className="p-3 text-center text-success">
							<p>Checkout successfull</p>
							<Link
								to="/products"
								className="btn btn-outline-success btn-sm"
								onClick={handleCheckout}
							>
								BUY MORE
							</Link>
						</div>
					)}
				</div>
				{cartItems.length > 0 && (
					<div className="col-md-3 p-3">
						<div className="card card-body">
							<p className="mb-1">Total Items</p>
							<h4 className=" mb-3 txt-right">{itemCount}</h4>
							<p className="mb-1">Total Payment</p>
							<h3 className="m-0 txt-right">{formatNumber(total)}</h3>
							<hr className="my-4" />
							<div className="text-center d-flex flex-column">
								<button
									type="button"
									className="btn btn-primary mb-2"
									onClick={handleCheckout}
								>
									CHECKOUT
								</button>
								<button
									type="button"
									className="btn btn-outlineprimary btn-sm"
									onClick={clearCart}
								>
									CLEAR
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

function mapStateToProp(state) {
	const { total, itemCount, cartItems, checkout } = state.cartReducer;
	return {
		total,
		itemCount,
		cartItems,
		checkout
	};
}

export default connect(mapStateToProp, {
	clearCart,
	handleCheckout,
	increase,
	decrease,
	removeProduct
})(Cart);
