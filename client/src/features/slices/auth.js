// --- IMPORTS --- //
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../api/authService";

// --- DECLARATIONS --- //
const user = {
	username: JSON.parse(localStorage.getItem("user")) ?? "",
	token: null,
	roles: [],
};

// --- DEFINITIONS --- //
export const register = createAsyncThunk(
	"auth/register",
	async ({ username, email, password }, thunkAPI) => {
		try {
			const response = await AuthService.register(username, email, password);
			return response.data;
		} catch (error) {
			const message = error?.response?.data?.message || error?.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const login = createAsyncThunk("auth/login", async ({ username, password }, thunkAPI) => {
	try {
		const response = await AuthService.login(username, password);
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.message || error?.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk("auth/logout", async (args, thunkAPI) => {
	const token = thunkAPI.getState().auth?.user?.accessToken;
	await AuthService.logout(token);
});

export const refresh = createAsyncThunk("auth/refresh", async (args, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth?.user?.accessToken;
		const response = await AuthService.refresh(token);
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.message || error?.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

const initialState = {
	loggedIn: false,
	user,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers(builder) {
		builder
			.addCase(register.rejected, (state, action) => {
				//
				state.error = action.payload;
				state.user = { token: null, username: "", roles: [] };
			})
			.addCase(login.fulfilled, (state, action) => {
				//
				state.error = null;
				state.loggedIn = true;
				state.user = { ...action.payload };
			})
			.addCase(login.rejected, (state, action) => {
				state.user = "";
				state.loggedIn = false;
				state.token = null;
			})
			.addCase(refresh.fulfilled, (state, action) => {
				//
				state.error = null;
				state.loggedIn = true;
				state.user = { ...action.payload };
			})
			.addCase(refresh.rejected, (state, action) => {
				//
				state.user = { token: null, username: "", roles: [] };
				state.error = action.payload;
				state.loggedIn = false;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.user = { token: null, username: "", roles: [] };
				state.token = null;
				state.loggedIn = false;
			});
	},
});

//
export const selectUsername = (state) => state.auth.user.username;
export const selectAuthToken = (state) => state.auth.user.token;
//
export const selectLoggedIn = (state) => state.auth.loggedIn;
export const selectAuthError = (state) => state.auth.error;
//
export default authSlice.reducer;
