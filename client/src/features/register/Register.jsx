// --- IMPORTS --- //
import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// custom imports
import { register } from '../slices/auth';
import ValidatedTextInput from '../../components/Input/ValidatedTextInput';
import { ValidatorTypes } from '../../hooks/useInputValidator';
// css imports
import "./Register.css";

//
function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usernameField = useRef();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [matchPass, setMatchPass] = useState('');

    const handleMatchPassChange = (e) => setMatchPass(e.target.value);

    const isValid = username && email && password && matchPass === password;

    useEffect(() => {
        usernameField.current.focus();
        setUsername('');
        setPassword('');
        setEmail('');
    }, []);

    const handleRegisterUser = (e) => {
        e.preventDefault();
        try {
            dispatch(register({ username, email, password })).unwrap();
            //
            navigate('/login');
        } catch (err) {
            //
        }
    }

    return (
        <main className="register-view">
            <form className="form registration-form">
                <fieldset>
                    <legend>Registration</legend>
                    <ValidatedTextInput ref={usernameField} name='username' setInputValue={setUsername} validatorType={ValidatorTypes.USERNAME} />
                    <ValidatedTextInput name="email" setInputValue={setEmail} />
                    <ValidatedTextInput name="password" type='password' setInputValue={setPassword} validatorType={ValidatorTypes.PASSWORD} />
                    <label htmlFor="matchpass" className='label' >confirm password:</label>
                    <input id="matchpass" name="matchpass" type='password'
                        autoComplete='new-password'
                        value={matchPass}
                        onChange={handleMatchPassChange}
                        placeholder="confirm password"
                    />
                    <button type='button' className='postFormButton postFormSubmit'
                        disabled={!isValid}
                        onClick={handleRegisterUser}
                    >sign up!</button>
                    <p className="alternateAction">
                        Already registered? <Link to="/login">Sign in!</Link>
                    </p>
                </fieldset>
            </form>
        </main>
    );
}

export default Register;