import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate, useLocation, Navigate } from "react-router-dom";

/* DataContext
import DataContext from "../context/DataContext";
// date formatting
import { format } from "date-fns";
// api
import api from "../api/posts";
*/

// date formatting
import { format } from "date-fns";

import { useStoreActions, useStoreState } from "easy-peasy";

function EditPost() {
	const { id } = useParams();
	let navigate = useNavigate();
	let location = useLocation();
	// DATA CONTEXT:
	// const { navigate, posts, setPosts } = useContext(DataContext);
	// const post = posts.find((p) => p.id.toString() === id);
	// const [editTitle, setEditTitle] = useState("");
	// const [editBody, setEditBody] = useState("");
	/*
	const handleEdit = async (id) => {
		const datetime = format(new Date(), "MMMM dd, yyyy pp");
		const updatePost = {
			id,
			datetime,
			title: editTitle,
			body: editBody,
			edited: true,
		};

		try {
			const response = await api.put(`/posts/${id}`, updatePost);
			const newPosts = posts.map((post) => (post.id === id ? { ...response.data } : post));
			setPosts(newPosts);
			setEditTitle("");
			setEditBody("");
			navigate(`/post/${id}`, { replace: true });
		} catch (err) {
			console.error(`Error: ${err.message}`);
		}
	};

	const handleEditCancel = () => {
		setEditTitle("");
		setEditBody("");
		navigate(id ? `/post/${id}` : "/", { replace: true });
	};

	useEffect(() => {
		if (post) {
			setEditTitle(post.title);
			setEditBody(post.body);
		}
	}, [post, setEditTitle, setEditBody]);
	*/

	// EASY-PEASY:
	const user = useStoreState((state) => state.user);
	const getPostById = useStoreState((state) => state.getPostById);
	const post = getPostById(id);

	const editTitle = useStoreState((state) => state.editTitle);
	const editBody = useStoreState((state) => state.editBody);

	const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
	const setEditBody = useStoreActions((actions) => actions.setEditBody);

	const editPost = useStoreActions((actions) => actions.editPost);
	const editCancel = useStoreActions((actions) => actions.editCancel);

	const handleEdit = (id) => {
		// const datetime = format(new Date(), "MMMM dd, yyyy pp");
		const updatedPost = {
			id,
			postTitle: editTitle.trim(),
			postBody: editBody.trim(),
		};

		editPost(updatedPost);
		navigate(`/post/${id}`, { replace: true });
	};

	const handleEditCancel = () => {
		editCancel();
		navigate(-1);
	};

	useEffect(() => {
		setEditTitle(post.title);
		setEditBody(post.body);
	}, [post, setEditTitle, setEditBody]);

	return (
		<main className="newPost">
			{!user && <Navigate to="/login" state={{ from: location }} />}
			{user && (
				<>
					<h2>Edit Post</h2>
					<form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
						<br />
						<label className="postFormLabel" htmlFor="postTitle">
							Title:
						</label>
						<input
							className="postFormInput"
							type="text"
							id="postTitle"
							placeholder="title"
							value={editTitle}
							required
							onChange={(e) => setEditTitle(e.target.value)}
						></input>
						<br />
						<label className="postFormLabel" htmlFor="postBody">
							Post:
						</label>
						<textarea
							className="postFormTextArea"
							id="postBody"
							value={editBody}
							onChange={(e) => setEditBody(e.target.value)}
							placeholder="enter a message ..."
							required
						/>
						<div className="postFormButtons">
							<button
								type="reset"
								className="postFormButton"
								onClick={handleEditCancel}
							>
								cancel
							</button>
							<button
								type="button"
								className="postFormButton postFormSubmit"
								onClick={() => handleEdit(post.id)}
								disabled={!editTitle || !editBody}
							>
								update
							</button>
						</div>
					</form>
				</>
			)}
		</main>
	);
}

export default EditPost;
