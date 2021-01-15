import React from 'react';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import { formatNumber } from '../Helper/utils';

const CartItem = ({ product, increase, decrease, removeProduct }) => {
	return (
		<div className="row no-gutters py-2">
			<div className="col-lg-2 p-2">
				<img
					alt={product.name}
					style={{ margin: '0 auto', maxHeight: '50px' }}
					src={product.image}
					className="img-fluid d-block"
				/>
			</div>
			<div className="col-lg-4 p-2">
				<h5 className="mb-1">{product.name}</h5>
				<p className="mb-1">Price: {formatNumber(product.price)} </p>
			</div>
			<div className="col-lg-2 p-2 text-center ">
				<p className="mb-0">Qty: {product.quantity}</p>
			</div>
			<div className="col-lg-4 p-2 text-right">
				<IconButton onClick={() => increase(product)} className="btn btn-primary btn-sm mr-2 mb-1">
					<AddSharpIcon color="primary" outlined />
				</IconButton>

				{product.quantity > 1 && (
					<IconButton
						onClick={() => decrease(product)}
						// className="btn btn-danger btn-sm mb-1"
					>
						<RemoveRoundedIcon outlined />
					</IconButton>
				)}

				{product.quantity === 1 && (
					<IconButton
						onClick={() => removeProduct(product)}
						// className="btn btn-danger btn-sm mb-1"
					>
						<DeleteForeverIcon outlined color="secondary" />
					</IconButton>
				)}
			</div>
		</div>
	);
};

export default CartItem;
