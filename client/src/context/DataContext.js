import { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
// hooks
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
	let navigate = useNavigate();

	const [posts, setPosts] = useState([]);
	const [searchResult, setSearchResult] = useState([]);

	// fetch posts
	const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3500/posts");
	// this replaces the old fetch ...
	useEffect(() => {
		setPosts(data);
	}, [data]);

	return (
		<DataContext.Provider
			value={{
				navigate,
				posts,
				setPosts,
				searchResult,
				setSearchResult,
				fetchError,
				isLoading,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export default DataContext;
