const Storage = cartItems => {
	localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));
};

export const sumItems = cartItems => {
	Storage(cartItems);
	let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
	let total = cartItems
		.reduce((total, product) => total + product.price * product.quantity, 0)
		.toFixed(2);
	return { itemCount, total };
};

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

export default function CartReducer(state = initialState, action) {
	switch (action.type) {
		case 'ADD_ITEM':
			if (!state.cartItems.find(item => item.id === action.payload.id)) {
				state.cartItems.push({
					...action.payload,
					quantity: 1
				});
			}

			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [ ...state.cartItems ]
			};
		case 'REMOVE_ITEM':
			return {
				...state,
				...sumItems(state.cartItems.filter(item => item.id !== action.payload.id)),
				cartItems: [ ...state.cartItems.filter(item => item.id !== action.payload.id) ]
			};
		case 'INCREASE':
			state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)]
				.quantity++;
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [ ...state.cartItems ]
			};
		case 'DECREASE':
			state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)]
				.quantity--;
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [ ...state.cartItems ]
			};
		case 'CHECKOUT':
			return {
				cartItems: [],
				checkout: !state.checkout,
				...sumItems([])
			};
		case 'CLEAR':
			localStorage.removeItem('cart');
			return {
				cartItems: [],
				...sumItems([])
			};
		case 'DELETE':
			console.log('h');
			console.log(state);
			const newArr = state.cartItems.filter(item => {
				console.log(item.id);
				console.log(action.payload.id);
				return item.id !== action.payload.id;
			});
			console.log(newArr);
			return {
				...state,
				...sumItems(state.cartItems),
				cartItem: [ ...newArr ]
			};
		default:
			return state;
	}
}
