import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupForm({ clickedBusiness, setClickedBusiness}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zip, setZip] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`} />;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({
        email,
        firstName,
        lastName,
        zip,
        image,
        username,
        password
      }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div >
      <form id="signup-form_form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            className="input sign-up-form_input"
            label="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            className="input sign-up-form_input"
            label="first name"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            className="input sign-up-form_input"
            label="last name"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Zip Code
          <input
            className="input sign-up-form_input"
            label="zip code"
            type="integer"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </label>
        <label>
          Profile Picture
          <input
            className="input sign-up-form_input"
            label="profile picture"
            type="file"
            onChange={updateFile}
          />
        </label>
        <label>
          Username
          <input
            className="input sign-up-form_input"
            label="user name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className="input sign-up-form_input"
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            className="input sign-up-form_input"
            label="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="button"
          label="sign up"
          id="sign-up-form_button"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
