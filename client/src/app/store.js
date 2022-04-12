import { configureStore } from "@reduxjs/toolkit";

// import custom reducers/slices
import authReducer from "../features/slices/auth";
import postsReducer from "../features/slices/posts";

export const store = configureStore({
	reducer: {
		/// custom reducers to export
		auth: authReducer,
		posts: postsReducer,
	},
});
