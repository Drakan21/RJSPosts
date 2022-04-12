// --- IMPORTS --- //
import axios from "axios";

// --- DECLARATIONS --- //
const BASE_URL = "http://localhost:5500";

// default (public) endpoints
export default axios.create({
	baseURL: BASE_URL,
});

// private (auth) endpoints
export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});
