import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import withAuth from '../HOC/withAuth';

import Login from './Login';
import Register from './Register';
import Product from './Product';
import Cart from './Cart';
import AdminProduct from './AdminProduct';
import NodeChat from './NodeChat';

const Main = () => {
	return (
		<Switch>
			<Route exact path="/" render={() => <h1>Home page</h1>} />
			<Route exact path="/products" component={withAuth(Product)} />
			<Route exact path="/contact" component={withAuth(NodeChat)} />
			<Route exact path="/login" render={(props) => <Login {...props} />} />
			<Route exact path="/register" render={(props) => <Register {...props} />} />
			<Route exact path="/cart" component={withAuth(Cart)} />
			<Route exact path="/adminproducts" component={withAuth(AdminProduct)} />
		</Switch>
	);
};

export default withRouter(Main);
