import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAllFiltered,
	getPostStatus,
	getPostError,
	getAllPosts,
} from "../features/slices/posts";
import Feed from "../components/Feed";
import STATUS from "../api/commsStatus";

function Home() {
	const dispatch = useDispatch();
	const posts = useSelector(selectAllFiltered);
	const status = useSelector(getPostStatus);
	const error = useSelector(getPostError);

	useEffect(() => {
		dispatch(getAllPosts());
	}, []);

	return (
		<main className="homeView">
			{status === STATUS.LOADING && <p className="statusMessage">Loading Posts ...</p>}
			{status === STATUS.FAILED && error && (
				<p className="statusMessage errorMessage">{error}</p>
			)}
			{status === STATUS.SUCCESS &&
				!error &&
				(posts?.length > 0 ? (
					<Feed posts={posts} />
				) : (
					<p className="statusMessage">No Posts to display.</p>
				))}
		</main>
	);
}

export default Home;
