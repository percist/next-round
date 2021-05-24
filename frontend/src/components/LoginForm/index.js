import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [userId, setUserId] = useState('');
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (sessionUser) setUserId(sessionUser.id);
  }, [sessionUser]);

  if (sessionUser) return <Redirect to={`/users/${userId}`} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password }))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    history.push(`/users/${sessionUser.id}`);
  };

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
          aria-label="log in"
          type="submit"
        >Log In
                </button>
      </form>
    </div>
  )
};

export default LoginForm;