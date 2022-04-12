import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

function NewPost() {
	let navigate = useNavigate();
	let location = useLocation();

	// EASY-PEASY
	const postTitle = useStoreState((state) => state.postTitle);
	const postBody = useStoreState((state) => state.postBody);
	const user = useStoreState((state) => state.user);

	const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
	const setPostBody = useStoreActions((actions) => actions.setPostBody);
	const savePost = useStoreActions((actions) => actions.savePost);
	const saveCancel = useStoreActions((actions) => actions.saveCancel);
	// const newPostID = useStoreActions((actions) => actions.newPostID);

	const handleSubmit = (e) => {
		e.preventDefault();
		// const datetime = format(new Date(), "MMMM dd, yyyy pp");
		(async () => {
			const newPost = {
				postTitle: postTitle.trim(),
				postBody: postBody.trim(),
				author: user.user,
			};
			const id = await savePost(newPost);
			navigate(`/post/${id}`, { replace: true });
		})();
	};

	const handleFormCancel = async () => {
		saveCancel();
		navigate("/");
	};

	return (
		<main className="newPost">
			{!user && <Navigate to="/login" state={{ from: location }} />}
			{user && (
				<>
					<h2>New Post</h2>
					<form className="newPostForm" onSubmit={handleSubmit}>
						<br />
						<label className="postFormLabel" htmlFor="postTitle">
							Title:
						</label>
						<input
							className="postFormInput"
							type="text"
							id="postTitle"
							placeholder="title"
							value={postTitle}
							required
							onChange={(e) => setPostTitle(e.target.value)}
						></input>
						<br />
						<label className="postFormLabel" htmlFor="postBody">
							Post:
						</label>
						<textarea
							className="postFormTextArea"
							id="postBody"
							value={postBody}
							onChange={(e) => setPostBody(e.target.value)}
							placeholder="enter a message ..."
							required
						/>
						<div className="postFormButtons">
							<button
								type="reset"
								className="postFormButton"
								onClick={handleFormCancel}
							>
								cancel
							</button>
							<button type="submit" className="postFormButton postFormSubmit">
								submit
							</button>
						</div>
					</form>
				</>
			)}
		</main>
	);
}

export default NewPost;

// import { useContext, useState } from 'react';
// import DataContext from "../context/DataContext";
// date formatting
// import { format } from "date-fns";
// api
// import api from "../api/posts";
//
// DATA CONTEXT:
// const { navigate, posts, setPosts } = useContext(DataContext);
// const [postTitle, setPostTitle] = useState("");
// const [postBody, setPostBody] = useState("");
/*
	const handleSubmit = async (e) => {
		e.preventDefault();
		const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
		const datetime = format(new Date(), "MMMM dd, yyyy pp");
		const newPost = {
			id,
			datetime,
			title: postTitle,
			body: postBody,
		};

		try {
			const response = await api.post("/posts", newPost);
			const allPosts = [...posts, response.data];
			setPosts(allPosts);
			setPostTitle("");
			setPostBody("");
			navigate("/");
		} catch (err) {
			console.error(`Error: ${err.message}`);
		}
	};

	const handleFormCancel = () => {
		setPostTitle("");
		setPostBody("");
		navigate("/", { replace: true });
	};
	*/
