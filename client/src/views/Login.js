import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PasswordField from "../components/PasswordField";
import { useStoreActions } from "easy-peasy";

const Login = () => {
	let navigate = useNavigate();
	let location = useLocation();
	const __login_url = "http://localhost:5500/login";

	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const [errMsg, setErrMsg] = useState("");

	const setUser = useStoreActions((actions) => actions.setUser);

	const handleLogin = (e) => {
		e.preventDefault();
		(async () => {
			try {
				const resp = await axios.post(__login_url, {
					user: userName,
					pass: password,
				});
				console.log(JSON.stringify(resp));
				setUser({ user: userName, atk: resp.data.accessToken });
				navigate(location.state?.from || "/");
			} catch (err) {
				setErrMsg(err.message);
			}
		})();
	};

	const handleCancelLogin = (e) => {
		e.preventDefault();
		setUserName("");
		setPassword("");
		navigate("/");
	};

	useEffect(() => {
		setUserName("");
		setPassword("");
	}, [setUserName, setPassword]);

	return (
		<main className="loginView">
			<form className="loginForm" onSubmit={handleLogin}>
				<fieldset className="formFieldset">
					<legend>Login existing user</legend>
					<label htmlFor="userName">Username:</label>
					<input
						type="text"
						id="userName"
						required
						autoComplete="username"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
					<label htmlFor="password">Password:</label>
					<PasswordField id="password" value={password} setValue={setPassword} />
					<div className="postFormButtons">
						<button
							className="postFormButton"
							type="button"
							onClick={handleCancelLogin}
						>
							cancel
						</button>
						<button className="postFormButton postFormSubmit" type="submit">
							login
						</button>
					</div>
					{errMsg && <p>{errMsg}</p>}
					<p className="alternateAction">
						Don't have an account? <Link to="/register">Register</Link>
					</p>
				</fieldset>
			</form>
		</main>
	);
};

export default Login;
