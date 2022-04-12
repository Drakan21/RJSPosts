// --- IMPORTS --- //
import { axiosPrivate } from "./service";

// --- DECLARATIONS --- //
const REGISTRATION_URL = "/register";
const LOGIN_URL = "/login";
const LOGOUT_URL = "/logout";
const REFRESH_URL = "/refresh";

const register = async (username, email, password) => {
	return axiosPrivate.post(REGISTRATION_URL, { username, email, password });
};

const login = async (username, password) => {
	return axiosPrivate.post(LOGIN_URL, { username, password });
};

const refresh = async (token) => {
	return axiosPrivate.get(REFRESH_URL, {
		withCredentials: true,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const logout = async (token) => {
	return axiosPrivate.get(LOGOUT_URL, {
		withCredentials: true,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const AuthService = {
	register,
	login,
	logout,
	refresh,
};

export default AuthService;
