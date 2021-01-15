import React from 'react';

import CartItem from './CartItem';

const CartProducts = ({ cartItems, increase, decrease, removeProduct }) => {
	return (
		<div>
			<div className="card card-body border-0">
				{cartItems.map(product => (
					<CartItem
						key={product.id}
						product={product}
						increase={increase}
						decrease={decrease}
						removeProduct={removeProduct}
					/>
				))}
			</div>
		</div>
	);
};

export default CartProducts;
