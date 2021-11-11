import { publicRequest, userRequest } from "../requestMethods";
import {
	addProductFailure,
	addProductStart,
	addProductSuccess,
	deleteFailure,
	deleteStart,
	deleteSuccess,
	getProductFailure,
	getProductStart,
	getProductSuccess,
	updateProductFailure,
	updateProductStart,
	updateProductSuccess,
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
	getUsersFailure,
	getUsersStart,
	getUsersSuccess,
	updateUsersFailure,
	updateUsersStart,
	updateUsersSuccess,
} from "./usersRedux";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
		dispatch(loginSuccess(res.data));
	} catch (error) {
		dispatch(loginFailure());
	}
};
export const getProducts = async (dispatch) => {
	dispatch(getProductStart());
	try {
		const res = await publicRequest.get("/products");
		dispatch(getProductSuccess(res.data));
	} catch (error) {
		dispatch(getProductFailure());
	}
};
export const deleteProduct = async (id, dispatch) => {
	dispatch(deleteStart());
	try {
		await userRequest.delete(`/products/${id}`);
		dispatch(deleteSuccess(id));
	} catch (error) {
		dispatch(deleteFailure());
	}
};
export const updateProduct = async (id, product, dispatch) => {
	dispatch(updateProductStart());
	try {
		// const res = await userRequest.updateProduct(`/products/${id}`);
		dispatch(updateProductSuccess({ id, product }));
	} catch (error) {
		dispatch(updateProductFailure());
	}
};

export const addProduct = async (product, dispatch) => {
	dispatch(addProductStart());
	try {
		const res = await userRequest.post(`/products`, product);
		dispatch(addProductSuccess(res.data));
	} catch (error) {
		dispatch(addProductFailure());
	}
};

export const getUsers = async (dispatch, user) => {
	dispatch(getUsersStart());
	try {
		const res = await userRequest.get("/users", user);
		dispatch(getUsersSuccess(res.data));
	} catch (error) {
		dispatch(getUsersFailure());
	}
};

export const updateUser = async (dispatch, user) => {
	dispatch(updateUsersStart());
	try {
		await userRequest.put(`/users/${user._id}`, user);

		dispatch(updateUsersSuccess());
	} catch (error) {
		dispatch(updateUsersFailure());
	}
};
