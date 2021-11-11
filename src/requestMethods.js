import axios from "axios";

const BASE_URL = "https://testapi-lrosic.herokuapp.com/api/";
let TOKEN = "";
try {
	TOKEN =
		JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
			.currentUser.accessToken || " ";
} catch (err) {
	console.log(err);
}

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});
export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
