// --- IMPORTS --- //
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterPosts } from "../features/slices/posts";
import { selectLoggedIn } from "../features/slices/auth";

// --- DECLARATIONS --- //
const Nav = () => {
	const dispatch = useDispatch();
	const loggedIn = useSelector(selectLoggedIn);
	const [search, setSearch] = useState("");

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
					<Link to="/">Home</Link>
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
				<li>{!loggedIn && <Link to="/login">Login</Link>}</li>
			</ul>
		</nav>
	);
};

export default Nav;
