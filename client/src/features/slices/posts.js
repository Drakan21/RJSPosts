// -- IMPORTS -- //
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../api/postService";
import STATUS from "../../api/commsStatus";

// -- DEFINITIONS -- //

// retrieve all posts from DB
export const getAllPosts = createAsyncThunk("posts/getAllPosts", async (args, thunkAPI) => {
	// set loading flag to true
	thunkAPI.dispatch(postsLoading(true));
	try {
		// call GetAll from API
		const response = await PostService.getAll();
		// return array of posts data
		return [...response.data];
	} catch (error) {
		// reject on fail with error msg
		return thunkAPI.rejectWithValue("Could not load posts.");
	}
});

// retrieve post by specified ID
export const getPostById = createAsyncThunk("/posts/getById", async ({ id }, thunkAPI) => {
	// set loading flag to true
	thunkAPI.dispatch(postsLoading(true));
	try {
		// call GetByID from API
		const response = await PostService.getById(id);
		// return specific post data
		return response.data;
	} catch (error) {
		// reject with error msg
		return thunkAPI.rejectWithValue("Could not retrieve post.");
	}
});

// add a new POST
export const addPost = createAsyncThunk(
	"/posts/addPost",
	async ({ title, body, author }, thunkAPI) => {
		// retrieve current logged in USER access token
		const token = thunkAPI.getState().auth?.user?.accessToken;
		// set loading to true
		thunkAPI.dispatch(postsLoading(true));
		try {
			// call CREATE on API for new posts
			const response = await PostService.create(title, body, author, token);
			// return create result
			return response.data;
		} catch (error) {
			// reject with error message.
			const message = error?.response?.data?.message || error?.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// update an existing post
export const updatePost = createAsyncThunk(
	"/posts/updatePost",
	async ({ id, title, body, author }, thunkAPI) => {
		// retrieve current  logged in USER access token
		const token = thunkAPI.getState().auth?.user?.accessToken;
		// set loading to true
		thunkAPI.dispatch(postsLoading(true));
		try {
			// call UPDATE on API
			const response = await PostService.update(id, title, body, author, token);
			// return updated post data
			return response.data;
		} catch (error) {
			// reject with error message
			const message = error?.response?.data?.message || error?.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// remove an existing post
export const removePost = createAsyncThunk("/posts/removePost", async ({ id }, thunkAPI) => {
	// set loading to true
	thunkAPI.dispatch(postsLoading(true));
	try {
		// retrieve current logged in USER access token
		const token = thunkAPI.getState().auth?.user?.accessToken;
		// call remove on API
		const response = await PostService.remove(id, token);
		// return removed post data
		return response.data;
	} catch (error) {
		// reject with error msg
		const message = error?.response?.data?.message || error?.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// init state for posts slice
const initialState = {
	posts: [],
	post: null,
	filtered: [],
	isLoading: false,
	error: null,
	status: STATUS.IDLE,
};

//
const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		// loading state
		postsLoading(state, actions) {
			state.isLoading = actions.payload;
		},
		// filter functionality for searching posts
		filterPosts(state, action) {
			const flt = action.payload;
			state.filtered = flt
				? [...state.posts].filter(
						(post) =>
							post.title.toLowerCase().includes(flt.toLowerCase()) ||
							post.body.toLowerCase().includes(flt.toLowerCase())
				  )
				: [...state.posts];
		},
	},
	extraReducers(builder) {
		// API call reducers and handlers
		builder
			.addCase(getAllPosts.fulfilled, (state, action) => {
				//
				state.posts = action.payload;
				state.filtered = [...state.posts];
				state.status = STATUS.SUCCESS;
				state.isLoading = false;
			})
			.addCase(getAllPosts.rejected, (state, action) => {
				//
				state.posts = [];
				state.status = STATUS.FAILED;
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(getPostById.fulfilled, (state, action) => {
				//
				state.post = action.payload;
				state.status = STATUS.SUCCESS;
				state.isLoading = false;
			})
			.addCase(getPostById.rejected, (state, action) => {
				//
				state.status = STATUS.FAIL;
				state.isLoading = false;
			})
			.addCase(addPost.fulfilled, (state, action) => {
				//
				state.status = STATUS.SUCCESS;
				state.isLoading = false;
				state.posts = [...state.posts, action.payload];
			})
			.addCase(addPost.rejected, (state, action) => {
				//
				state.status = STATUS.FAILED;
				state.isLoading = false;
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				//
				state.status = STATUS.SUCCESS;
				state.isLoading = false;
				const posts = [...state.posts].filter((post) => post.id !== action.payload.id);
				state.posts = [...posts, action.payload];
			})
			.addCase(updatePost.rejected, (state, action) => {
				//
				state.status = STATUS.FAILED;
				state.isLoading = false;
			})
			.addCase(removePost.fulfilled, (state, action) => {
				//
				state.status = STATUS.SUCCESS;
				state.isLoading = false;
				const posts = [...state.posts].filter((post) => post.id !== action.payload.id);
				state.posts = posts;
			})
			.addCase(removePost.rejected, (state, action) => {
				//
				state.status = STATUS.FAILED;
				state.isLoading = false;
			})
			.addDefaultCase((state, action) => {
				//
				state.status = STATUS.IDLE;
				state.isLoading = false;
			});
	},
});

// -- EXPORTS -- //
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state) => state.posts.post;
export const selectAllFiltered = (state) => state.posts.filtered;
export const getIsPostLoading = (state) => state.posts.isLoading;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const getPostCount = (state) => state.posts.posts?.length || 0;

export const { filterPosts, postsLoading } = postsSlice.actions;

export default postsSlice.reducer;
