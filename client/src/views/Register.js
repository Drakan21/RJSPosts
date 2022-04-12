import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Process from "../components/Process";
import PasswordField from "../components/PasswordField";

const Register = () => {
	let navigate = useNavigate();
	let location = useLocation();
	const __reg_url = "http://localhost:5500/register";

	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [passConfirm, setPassConfirm] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [message, setMessage] = useState("");

	const handleRegister = (e) => {
		e.preventDefault();
		setMessage("Registering new user ...");
		(async () => {
			try {
				const resp = await axios.post(
					__reg_url,
					{
						user: userName,
						pass: password,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
						withCredentials: true,
					}
				);
				setMessage(resp.data.message);
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			} catch (err) {
				// console.error(err.message);
				setErrMsg(err.message);
			}
		})();
	};

	const handleCancelRegister = (e) => {
		setUserName("");
		setPassword("");
		setMessage("");
		setErrMsg("");
		navigate("/");
	};

	useEffect(() => {
		setUserName("");
		setPassword("");
		setErrMsg("");
		setMessage("");
	}, [setUserName, setPassword, setErrMsg, setMessage]);

	return (
		<main className="registerView">
			{errMsg && <p>{errMsg}</p>}
			{message && !errMsg && <Process msg={message} />}
			{!message && !errMsg && (
				<>
					<form className="registerForm" onSubmit={handleRegister}>
						<fieldset className="formFieldset">
							<legend>Register new user</legend>
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
							<PasswordField
								id="passwordConfirm"
								value={passConfirm}
								setValue={setPassConfirm}
							/>
							<div className="postFormButtons">
								<button
									className="postFormButton"
									type="button"
									onClick={handleCancelRegister}
								>
									cancel
								</button>
								<button className="postFormButton postFormSubmit" type="submit">
									register
								</button>
							</div>
							{errMsg && <p>{errMsg}</p>}
							<p className="alternateAction">
								Already registered? <Link to="/login">Sign in</Link>
							</p>
						</fieldset>
					</form>
				</>
			)}
		</main>
	);
};

export default Register;
