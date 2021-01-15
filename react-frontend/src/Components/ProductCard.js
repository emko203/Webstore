import '../Styling/ProductCard.css';
import React, { useState } from 'react';
import { formatNumber } from '../Helper/utils';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import AdminProduct from './AdminProduct';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		transform: `translate(-50%, -50%)`,
		top: `50%`,
		left: `50%`,
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

export default function ProductCard({
	id,
	image,
	name,
	price,
	description,
	addProduct,
	isAdmin,
	deleteProduct,
	loadProducts
}) {
	const [ open, setOpen ] = useState(false);

	const handleClick = (e) => {
		addProduct({ id, name, image, price });
	};

	const handleClose = (e) => {
		setOpen(false);
	};

	const classes = useStyles();

	const edit = ({ productID, name, price, image, description }) => {
		console.log(productID);
		axios
			.put('http://localhost:8080/product/edit/', {
				productID,
				name,
				price,
				image,
				description
			})
			.then(() => {
				setOpen(false);
				loadProducts();
			});
	};

	const body = (
		<div className={classes.paper}>
			<h2 id="simple-modal-title">Edit Product</h2>
			<AdminProduct
				isEditing
				id={id}
				name={name}
				price={price}
				image={image}
				description={description}
				edit={edit}
			/>
		</div>
	);

	return (
		<div className="card " id="custom-card">
			<img className="card-img-top" src={image} alt={name} />
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
				<p className="card-text">{description}</p>
				<p className="text-muted text-small">Price: {formatNumber(price)}</p>
				{!isAdmin && (
					<button className="btn btn-primary" onClick={handleClick}>
						Add To Cart
					</button>
				)}
				{isAdmin && (
					<div>
						<button className="btn btn-warning mr-2" onClick={() => setOpen(true)}>
							Edit
						</button>

						<button className="btn btn-danger" onClick={() => deleteProduct(id)}>
							Delete
						</button>
					</div>
				)}
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}
