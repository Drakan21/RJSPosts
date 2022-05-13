// --- IMPORTS --- //
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PasswordField from "../../components/PasswordField";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuthError } from "../slices/auth";

// --- DECLARATIONS --- //
const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const error = useSelector(selectAuthError);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username, password })).then((resp) => {
            if (resp.error) {
                console.log(resp);
                navigate("/login", { replace: true });
            } else {
                navigate(location.state?.from || "/");
            }
        });
    };

    const handleCancelLogin = (e) => {
        e.preventDefault();
        setUsername("");
        setPassword("");
        navigate("/");
    };

    useEffect(() => {
        setUsername("");
        setPassword("");
    }, [setUsername, setPassword]);

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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    {error && <p>{error}</p>}
                    <p className="alternateAction">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </fieldset>
            </form>
        </main>
    );
};

export default Login;
