import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "product",
	initialState: {
		products: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		//GET ALL
		getProductStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getProductSuccess: (state, action) => {
			state.isFetching = false;
			state.products = action.payload;
		},
		getProductFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},

		//DELTE
		deleteStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		deleteSuccess: (state, action) => {
			state.isFetching = false;
			state.products.splice(
				state.products.findIndex((item) => item._id === action.payload.id),
				1
			);
		},
		deleteFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},

		//UPDATE
		updateProductStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateProductSuccess: (state, action) => {
			state.isFetching = false;
			state.products[
				state.products.findIndex((item) => item._id === action.payload)
			] = action.payload.product;
		},
		updateProductFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},

		//NEW
		addProductStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		addProductSuccess: (state, action) => {
			state.isFetching = false;
			state.products.push(action.payload);
		},
		addProductFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getProductFailure,
	getProductStart,
	getProductSuccess,
	deleteFailure,
	deleteStart,
	deleteSuccess,
	updateProductFailure,
	updateProductStart,
	updateProductSuccess,
	addProductFailure,
	addProductStart,
	addProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
