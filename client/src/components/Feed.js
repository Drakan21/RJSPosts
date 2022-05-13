// --- IMPORTS --- //
import React from "react";
import Post from "../components/Post";

// --- DECLARATIONS --- //
const Feed = ({ posts }) => {
	return (
		<>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</>
	);
};

export default Feed;
