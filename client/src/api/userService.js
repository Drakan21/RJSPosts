// -- IMPORT -- //
import axios from "./service";

// -- DECLARATIONS -- //
const USER_URL = "/users";

const getUserById = async (id) => {
	return axios.get(`${USER_URL}/${id}`);
};

const getUserPosts = async (id) => {
	return axios.get(`${USER_URL}/${id}/posts`);
};

const UserService = {
	getUserById,
	getUserPosts,
};

export default UserService;
