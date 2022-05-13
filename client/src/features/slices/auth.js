// --- IMPORTS --- //
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../api/authService";

// --- DECLARATIONS --- //
const user = {
	id: "",
	username: JSON.parse(localStorage.getItem("user")) ?? "",
	email: "",
	accessToken: null,
	roles: [],
};

const nullUser = () => {
	return {
		id: "",
		username: "",
		email: "",
		accessToken: null,
		roles: [],
	};
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

const initialState = {
	loggedIn: false,
	user,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		refresh(state, actions) {
			state.user.accessToken = actions.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(register.rejected, (state, action) => {
				//
				state.error = action.payload;
				state.user = nullUser();
			})
			.addCase(login.fulfilled, (state, action) => {
				//
				state.error = null;
				state.loggedIn = true;
				state.user = { ...action.payload };
			})
			.addCase(login.rejected, (state, action) => {
				state.error = "Login failed.";
				state.user = "";
				state.loggedIn = false;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.user = nullUser();
				state.loggedIn = false;
			});
	},
});

//
export const selectUsername = (state) => state.auth.user.username;
export const selectUserId = (state) => state.auth.user.id;
export const selectAuthToken = (state) => state.auth.user.accessToken;
export const selectEmail = (state) => state.auth.user.email;
//
export const selectLoggedIn = (state) => state.auth.loggedIn;
export const selectAuthError = (state) => state.auth.error;
//
export const { refresh } = authSlice.actions;

export default authSlice.reducer;
