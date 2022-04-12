// pages/views

import Register from "./features/register/Register";
import Login from "./features/login/Login";
import NewPost from "./features/post/NewPost";
import PostFull from "./features/post/PostFull";
import EditPost from "./features/post/EditPost";
//
import Home from "./views/Home";
import Missing from "./views/Missing";

// layout - components
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// router
import { Routes, Route, Outlet } from "react-router-dom";
import About from "./views/About";

function App() {
	return (
		<div className="App">
			<Header title="ReactJS Blog" />
			<Nav />
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="post">
						<Route index element={<NewPost />} />
						<Route path=":id" replace element={<PostFull />} />
						<Route path="edit/:id" replace element={<EditPost />} />
					</Route>
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="about" element={<About />} />
				</Route>
				<Route path="*" element={<Missing />} />
			</Routes>
			<Outlet />
			<Footer />
		</div>
	);
}
export default App;
