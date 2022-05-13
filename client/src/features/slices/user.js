// -- IMPROTs -- //
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import STATUS from "../../api/commsStatus";
import UserService from "../../api/userService";

const profile = {
	id: "",
	username: "",
	email: "",
	joined: "",
	postsCount: 0,
	posts: [],
};

// -- DEFINITIONS -- //

export const getUserDetails = createAsyncThunk("user/getUserDetails", async ({ id }, thunkAPI) => {
	thunkAPI.dispatch(profileLoading(true));
	try {
		const response = await UserService.getUserById(id);
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.message || error?.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const getUserPosts = createAsyncThunk("user/getUserPosts", async ({ id }, thunkAPI) => {
	thunkAPI.dispatch(profileLoading(true));
	try {
		const response = await UserService.getUserPosts(id);
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.message || error?.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

const initialState = {
	profile,
	error: null,
	isLoading: false,
	status: STATUS.IDLE,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		//
		profileLoading(state, actions) {
			state.isLoading = actions.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getUserDetails.fulfilled, (state, action) => {
				//
				state.id = action.payload.id;
				state.username = action.payload?.username || "";
				state.email = action.payload?.email || "";
				state.joined = action.payload?.joined || "";
				state.postsCount = action.payload?.postsCount || 0;
				state.isLoading = false;
			})
			.addCase(getUserDetails.rejected, (state, action) => {
				//
				state.username = "";
				state.email = "";
				state.joined = "";
				state.postsCount = 0;
				state.posts = [];
				state.isLoading = false;
			})
			.addCase(getUserPosts.fulfilled, (state, action) => {
				//
				state.posts = [...action.payload];
				state.isLoading = false;
			})
			.addCase(getUserPosts.rejected, (state, action) => {
				//
				state.posts = [];
				state.isLoading = false;
			});
	},
});

// -- EXPORTS -- //
export const selectUserId = (state) => state.user.id;
export const selectUserName = (state) => state.user.username;
export const selectUserEmail = (state) => state.user.email;
export const selectUserJoined = (state) => state.user.joined;
export const selectUserPosts = (state) => state.user.posts;
export const selectUserPostsCount = (state) => state.user.postsCount;
export const getIsProfileLoading = (state) => state.user.isLoading;

export const { profileLoading } = userSlice.actions;

export default userSlice.reducer;
