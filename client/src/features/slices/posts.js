// -- IMPORTS -- //
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../api/postService";
import STATUS from "../../api/commsStatus";

// -- DEFINITIONS -- //
export const getAllPosts = createAsyncThunk("posts/getAllPosts", async (args, thunkAPI) => {
	thunkAPI.dispatch(postsLoading(true));
	try {
		const response = await PostService.getAll();
		return [...response.data];
	} catch (error) {
		// const message = error?.response?.data?.message || error?.message || error.toString();
		// return message;
		return thunkAPI.rejectWithValue("Could not load posts.");
	}
});

export const getPostById = createAsyncThunk("/posts/getById", async ({ id }, thunkAPI) => {
	thunkAPI.dispatch(postsLoading(true));
	try {
		const response = await PostService.getById(id);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue("Could not retrieve post.");
	}
});

export const addPost = createAsyncThunk(
	"/posts/addPost",
	async ({ title, body, author }, thunkAPI) => {
		const token = thunkAPI.getState().auth?.user?.accessToken;
		thunkAPI.dispatch(postsLoading(true));
		try {
			const response = await PostService.create(title, body, author, token);
			return response.data;
		} catch (error) {
			const message = error?.response?.data?.message || error?.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const updatePost = createAsyncThunk(
	"/posts/updatePost",
	async ({ id, title, body, author }, thunkAPI) => {
		const token = thunkAPI.getState().auth?.user?.accessToken;
		console.log(thunkAPI.getState());
		thunkAPI.dispatch(postsLoading(true));
		try {
			const response = await PostService.update(id, title, body, author, token);
			return response.data;
		} catch (error) {
			const message = error?.response?.data?.message || error?.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const removePost = createAsyncThunk("/posts/removePost", async ({ id }, thunkAPI) => {
	thunkAPI.dispatch(postsLoading(true));
	try {
		const token = thunkAPI.getState().auth?.user?.accessToken;
		const response = await PostService.remove(id, token);
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.message || error?.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

const initialState = {
	posts: [],
	post: null,
	filtered: [],
	isLoading: false,
	error: null,
	status: STATUS.IDLE,
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postsLoading(state, actions) {
			state.isLoading = actions.payload;
		},
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

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state) => state.posts.post;
export const selectAllFiltered = (state) => state.posts.filtered;
export const getIsPostLoading = (state) => state.posts.isLoading;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const getPostCount = (state) => state.posts.posts?.length || 0;

export const { filterPosts, postsLoading } = postsSlice.actions;

export default postsSlice.reducer;
