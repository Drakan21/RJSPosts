// --- IMPORT --- //
import axios, { axiosPrivate } from "./service";

// --- DECLARATIONS --- //
const POST_URL = "/posts";

const getAll = async () => {
	return axios.get(POST_URL);
};

const getById = async (id) => {
	return axios.get(`${POST_URL}/${id}`);
};

const create = async (title, body, author, token) => {
	return axiosPrivate.post(
		POST_URL,
		{ title, body, author },
		{
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

const update = async (id, title, body, author, token) => {
	return axiosPrivate.put(
		`${POST_URL}/${id}`,
		{ id, title, body, author },
		{
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

const remove = async (id, token) => {
	return axiosPrivate.delete(`${POST_URL}/${id}`, {
		withCredentials: true,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const PostService = {
	getAll,
	getById,
	create,
	update,
	remove,
};

export default PostService;
