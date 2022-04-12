// pages/views
import Home from "./views/Home";
import NewPost from "./views/NewPost";
import Post from "./views/Post";
import EditPost from "./views/EditPost";
import About from "./views/About";
import Missing from "./views/Missing";
// import Register from "./views/Register";
import Register from "./features/register/Register";
import Login from "./views/Login";
// layout - components
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// router
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
// data contexts
// import { DataProvider } from "./context/DataContext";

import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";

function App() {
	const setPosts = useStoreActions((actions) => actions.setPosts);

	// fetch posts

	const { data, fetchError, isLoading } = useAxiosFetch(`${process.env.REACT_APP_APIURL}/posts`);
	// this replaces the old fetch ...
	useEffect(() => {
		setPosts(data);
	}, [data, setPosts]);

	return (
		<div className="App">
			<Header title="ReactJS Blog" />
			<Nav />
			<Routes>
				<Route path="/">
					<Route index element={<Home />} fetchError={fetchError} isLoading={isLoading} />
					<Route path="post">
						<Route index element={<NewPost />} />
						<Route path=":id" replace element={<Post />} />
						<Route path="edit/:id" replace element={<EditPost />} />
					</Route>
					<Route path="about" element={<About />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/index" element={<Navigate to="/" replace />} />
				<Route path="*" element={<Missing />} />
			</Routes>
			<Outlet />
			<Footer />
		</div>
	);
}
export default App;
