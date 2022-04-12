/**
 * SINGLE POST VIEW
 *
 */
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
/* DataContext
import { useContext } from 'react';
import DataContext from "../context/DataContext";
// api
import api from "../api/posts";
*/

// Easy-Peasy
import { useStoreActions, useStoreState } from "easy-peasy";

function Post() {
	const { id } = useParams();
	let navigate = useNavigate();

	// With Data-Context:
	// const { navigate, posts, setPosts } = useContext(DataContext);
	//	const post = posts.find((post) => post.id.toString() === id);
	// const handleDelete = async (id) => {
	// 	// delete post
	// 	try {
	// 		await api.delete(`/posts/${id}`);
	// 		const postsList = posts.filter((post) => post.id !== id);
	// 		setPosts(postsList);
	// 		navigate("/");
	// 	} catch (err) {
	// 		console.error(`Error: ${err.message}`);
	// 	}
	// };

	// Easy-Peasy stores
	const deletePost = useStoreActions((actions) => actions.deletePost);
	const getPostById = useStoreState((state) => state.getPostById);
	const post = getPostById(id);

	const handleDelete = (id) => {
		deletePost(id);
		navigate("/");
	};

	return (
		<main>
			<article className="post">
				{post && (
					<>
						<div className="postHeader">
							<h2>{post.title}</h2>
							<small className="postDate">
								{format(new Date(post.date), "MMMM dd, yyyy hh:mm a")}
								{post.edited && <em> (edited)</em>}
							</small>
						</div>
						<p className="postAuthor">{post.author}</p>
						<p className="postBody">{post.body}</p>
						<div className="buttons">
							<Link to={`/post/edit/${id}`}>
								<button className="postFormButton postEdit">edit</button>
							</Link>
							<button className="postDelete" onClick={() => handleDelete(post.id)}>
								delete
							</button>
						</div>
					</>
				)}
				{!post && (
					<>
						<h2>Post Not Found!</h2>
						<p>Well, that's disappointing...</p>
						<p>
							<Link to="/">&lt; Return to Homepage.</Link>
						</p>
					</>
				)}
			</article>
		</main>
	);
}

export default Post;
