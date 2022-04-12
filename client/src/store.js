import { createStore, action, thunk, computed } from "easy-peasy";
// import posts from "./api/posts";
import api from "./api/service";

export default createStore({
	user: null,
	setUser: action((state, payload) => {
		state.user = payload;
	}),
	posts: [],
	setPosts: action((state, payload) => {
		state.posts = payload;
	}),
	postTitle: "",
	setPostTitle: action((state, payload) => {
		state.postTitle = payload;
	}),
	postBody: "",
	setPostBody: action((state, payload) => {
		state.postBody = payload;
	}),
	editTitle: "",
	setEditTitle: action((state, payload) => {
		state.editTitle = payload;
	}),
	editBody: "",
	setEditBody: action((state, payload) => {
		state.editBody = payload;
	}),
	search: "",
	setSearch: action((state, payload) => {
		state.search = payload;
	}),
	searchResult: [],
	setSearchResult: action((state, payload) => {
		state.searchResult = payload;
	}),
	postCount: computed((state) => state.posts.length),
	getPostById: computed((state) => {
		return (id) => state.posts.find((post) => post.id.toString() === id);
	}),
	newPostID: computed((state) => {
		return () => (state.posts.length > 0 ? state.posts[state.posts.length].id + 1 : 1);
	}),
	authHead: computed((state) => {
		return state.user ? { headers: { Authorization: `Bearer ${state.user.atk}` } } : {};
	}),
	savePost: thunk(async (actions, newPost, helpers) => {
		const { posts } = helpers.getState();
		try {
			const response = await api.post("/posts", newPost);
			actions.setPosts([...posts, response.data]);
			actions.setPostTitle("");
			actions.setPostBody("");
			// cannot have hooks inside this function
			// navigate("/");
			return response.data.id || "";
		} catch (err) {
			console.error(`Error: ${err.message}`);
		}
	}),
	saveCancel: thunk(async (actions) => {
		actions.setPostTitle("");
		actions.setPostBody("");
	}),
	deletePost: thunk(async (actions, id, { getState }) => {
		const { posts, user } = getState();
		try {
			await api.delete(`/posts/${id}`, { headers: { Authorization: `Bearer ${user.atk}` } });
			actions.setPosts(posts.filter((post) => post.id !== id));
			// cannot have hooks inside this function
			// navigate("/");
		} catch (err) {
			console.error(`Error: ${err.message}`);
		}
	}),
	editPost: thunk(async (actions, updatedPost, { getState }) => {
		const { posts, user } = getState();
		const { id } = updatedPost;
		try {
			const response = await api.put(`/posts/${id}`, updatedPost, {
				headers: { Authorization: `Bearer ${user.atk}` },
			});
			const newPosts = posts.map((post) => (post.id === id ? { ...response.data } : post));
			actions.setPosts(newPosts);
			actions.setEditTitle("");
			actions.setEditBody("");
			// cannot have hooks inside this function
			// navigate(`/post/${id}`, { replace: true });
		} catch (err) {
			console.error(`Error: ${err.message}`);
		}
	}),
	editCancel: thunk(async (actions) => {
		actions.setEditTitle("");
		actions.setEditBody("");
	}),
	refresh: thunk(async (actions, payload, { getState }) => {
		try {
			const { user } = getState();
			const tk = await api.get(`/refresh`, {
				headers: { Authorization: `Bearer ${user.atk}` },
			});
			actions.setUser({ ...this.user, atk: tk });
		} catch (err) {
			console.error(`Error: ${err.message}`);
		}
	}),
	logout: thunk(async (actions) => {
		try {
			await api.get(`/logout`);
			actions.setUser(null);
		} catch (err) {
			console.error(`Error: ${err.message}`);
		}
	}),
});
