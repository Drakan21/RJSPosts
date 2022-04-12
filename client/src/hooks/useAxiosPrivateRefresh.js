// --- IMPORTS --- //
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../api/service";
import { refresh, selectAuthToken } from "../features/slices/auth";

export const useAxiosPrivateRefresh = () => {
	const token = useSelector(selectAuthToken);
	const dispatch = useDispatch();

	useEffect(() => {
		// request interceptors:
		const requestInterceptor = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				Promise.reject(error);
			}
		);

		// response interceptors:
		const responseInterceptor = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					dispatch(refresh()).then(() => {
						prevRequest.headers["Authorization"] = `Bearer ${token}`;
						return axiosPrivate(prevRequest);
					});
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosPrivate.interceptors.request.eject(requestInterceptor);
			axiosPrivate.interceptors.response.eject(responseInterceptor);
		};
	}, [token, dispatch]);

	return axiosPrivate;
};

export default useAxiosPrivateRefresh;
