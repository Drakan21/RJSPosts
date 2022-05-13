// --- IMPORTS --- //
import { useSelector } from "react-redux";
import { getPostCount } from "../features/slices/posts";
import UserMenu from "./UserMenu/UserMenu";

// --- DECLARATIONS --- //
const Header = ({ title }) => {
	const postCount = useSelector(getPostCount);

	return (
		<header>
			<div className="headerContent">
				<h1>{title}</h1>
				<p className="postCount">Posts: {postCount}</p>
				<UserMenu />
			</div>
		</header>
	);
};

export default Header;
