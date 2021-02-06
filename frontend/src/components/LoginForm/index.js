import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(sessionActions.login({ credential, password }))
            .catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            });
        history.push('/');    
    };

    // const handleDemo = async (e) => {
    //     e.preventDefault();
    //     setErrors([]);
    //     return dispatch(sessionActions.loginDemo())
    //         .catch((res) => {
    //             if (res.data && res.data.errors) setErrors(res.data.errors);
    //         });
    // };

    return (
        <div id="login">
            <form
                className="form"
                id="login-form"
                onSubmit={handleSubmit}
            >
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>)
                    )}
                </ul>
                <label>
                    Username or Email
                    <input
                        className="input"
                        type="text"
                        id="credential"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        className="input"
                        type="password"
                        value={password}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button
                    className="button"
                    id="button-login"
                    type="submit"
                    >Log In
                </button>
                {/* TODO: Configure demo login */}
                {/* <button
                    className="button"
                    id="button-login-demo"
                    onClick={handleDemo}
                    >Demo
                </button> */}
            </form>
        </div>
    )
}

export default LoginForm;