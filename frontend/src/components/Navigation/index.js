import React, {useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [form, setForm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const loginButton = (e) => {
    e.preventDefault();
    setForm("login");
    setShowModal("true");
  }

  const signupButton = (e) => {
    e.preventDefault();
    setForm("signup");
    setShowModal("true");
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink
          id="link-sites"
          to="/sites"
        >
          Find a Drink
        </NavLink>
        <NavLink
          id="link-my-rounds"
          to="/user/:id"
        >
          My Rounds
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <a href="/login" id="link-login" onClick={loginButton}>Login</a>
        <a href="/signup" id="link-signup" onClick={signupButton}>Sign Up</a>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            { form === "login" && (
              <LoginForm />
            )}
            { form === "signup" && (
              <SignupForm />
            )}
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      <ul className='navbar'>
        <li>
            <a className='navbar-logo' href={'/'} >
              <img src="./NextRoundText.png" alt="Next Round's on Me"/>
            </a>
        </li>
        <li className="navbar-link">
          <NavLink
            to="/" exact
            id="link-home"
          >Home
            </NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
      <hr />
    </>
  );
}

export default Navigation;