import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		getUsersStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getUsersSuccess: (state, action) => {
			state.isFetching = false;
			state.users = action.payload;
		},
		getUsersFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		updateUsersStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateUsersSuccess: (state, action) => {
			console.log("action", action.payload);
			state.isFetching = false;
			// state.users[
			// 	state.users.findIndex((item) => item._id === action.payload.user._id)
			// ] = action.payload;
		},
		updateUsersFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getUsersStart,
	getUsersFailure,
	getUsersSuccess,
	updateUsersFailure,
	updateUsersStart,
	updateUsersSuccess,
} = usersSlice.actions;
export default usersSlice.reducer;
