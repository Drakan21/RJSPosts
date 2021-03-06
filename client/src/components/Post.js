// --- IMPORTS --- //
import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

// --- DECLARATIONS --- //
const Post = ({ post }) => {
	return (
		<article className="post">
			<div className="postHeader">
				<Link to={`/post/${post.id}`}>
					<h2>{post.title}</h2>
					<small className="postDate">
						{format(new Date(post.date), "MMMM dd, yyyy hh:mm a")}
						{post.edited && <em> (edited)</em>}
					</small>
				</Link>
			</div>
			<p className="postBody">
				{post.body.length <= 50 ? post.body : `${post.body.slice(0, 50)} ...`}
			</p>
			<p className="postAuthor">
				:: <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link>
			</p>
		</article>
	);
};

export default Post;
