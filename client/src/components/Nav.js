import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterPosts } from "../features/slices/posts";
import { selectLoggedIn, logout } from "../features/slices/auth";

// import {useState, useContext} from 'react';
// import DataContext from "../context/DataContext";
// import { useStoreState, useStoreActions } from "easy-peasy";

function Nav() {
	// for DATA CONTEXT:
	// const { posts, setSearchResult } = useContext(DataContext);
	// const [search, setSearch] = useState("");

	// for Easy-Peasy store
	// const posts = useStoreState((state) => state.posts);
	// const search = useStoreState((state) => state.search);
	// const setSearch = useStoreActions((actions) => actions.setSearch);
	// const setSearchResult = useStoreActions((actions) => actions.setSearchResult);
	//
	// const user = useStoreState((state) => state.user);
	// const logout = useStoreActions((actions) => actions.logout);

	// filter posts
	// useEffect(() => {
	// 	const filteredRes = posts.filter(
	// 		(post) =>
	// 			post.body.toLowerCase().includes(search.toLowerCase()) ||
	// 			post.title.toLowerCase().includes(search.toLowerCase()) ||
	// 			post.date.toLowerCase().includes(search.toLowerCase())
	// 	);

	// 	setSearchResult(filteredRes.reverse());
	// }, [posts, search, setSearchResult]);

	const dispatch = useDispatch();
	const loggedIn = useSelector(selectLoggedIn);
	const [search, setSearch] = useState("");

	const handeOnLogout = () => {
		dispatch(logout());
	};

	useEffect(() => {
		dispatch(filterPosts(search));
	}, [search, dispatch]);

	return (
		<nav>
			<form className="searchForm" onSubmit={(e) => e.preventDefault()}>
				<label className="sr-only" htmlFor="search">
					search posts by title or message body
				</label>
				<input
					className="searchInput"
					type="text"
					id="search"
					placeholder="search posts"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
			<ul>
				<li>
					<Link to="/" reloadDocument="true">
						Home
					</Link>
				</li>
				<li>
					<Link to="/post">Post</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					{!loggedIn && <Link to="/login">Login</Link>}
					{loggedIn && (
						<Link to="/" onClick={handeOnLogout}>
							Logout
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
