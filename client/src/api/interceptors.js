// --- IMPORTS --- //
import authService from "../api/authService";
import { refresh } from "../features/slices/auth";
import { axiosPrivate } from "./service";

// --- DECLARATIONS --- //
const initInterceptors = (store) => {
	// request interceptors:
	axiosPrivate.interceptors.request.use(
		(config) => {
			const token = store.getState().auth?.user?.accessToken;
			if (token && !config.headers["Authorization"]) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);
	// response interceptors:
	axiosPrivate.interceptors.response.use(
		(response) => response,
		async (error) => {
			const prevRequest = error?.config;
			if (error?.response?.status === 403 && !prevRequest?.sent) {
				prevRequest.sent = true;
				const token = store.getState().auth?.user?.accessToken;
				const resp = await authService.refresh(token);
				const newToken = resp.data.accessToken;
				store.dispatch(refresh(newToken));
				prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
				return axiosPrivate(prevRequest);
			}
			return Promise.reject(error);
		}
	);
};

export default initInterceptors;
