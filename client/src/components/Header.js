// --- IMPORTS --- //
import { useSelector } from "react-redux";
import { selectLoggedIn, selectUsername } from "../features/slices/auth";
import { getPostCount } from "../features/slices/posts";
import { FaUserCircle } from "react-icons/fa";

function Header({ title }) {
	const username = useSelector(selectUsername);
	const loggedIn = useSelector(selectLoggedIn);
	const postCount = useSelector(getPostCount);

	return (
		<header>
			<div className="headerContent">
				<h1>{title}</h1>
				<p className="postCount">Posts: {postCount}</p>
				{loggedIn && (
					<div className="user-menu">
						<FaUserCircle />
						<p>{username}</p>
					</div>
				)}
			</div>
		</header>
	);
}

export default Header;
