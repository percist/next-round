import React, {useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from '../../context/Modal';
import image from "./NextRoundText.png";
import LoginForm from '../LoginForm';
import SignupFormPage from '../SignupFormPage';
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
          to={`/users/${sessionUser.id}`} exact
        >
          My Rounds
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      null
    //   <>
    //     <a href="/login" id="link-login" onClick={loginButton}>Login</a>
    //     <a href="/signup" id="link-signup" onClick={signupButton}>Sign Up</a>
    //     {showModal && (
    //       <Modal onClose={() => setShowModal(false)}>
    //         { form === "login" && (
    //           <LoginForm />
    //         )}
    //         { form === "signup" && (
    //           <SignupFormPage />
    //         )}
    //       </Modal>
    //     )}
      // </>
    );
  }

  return (
    <>
      <ul className='navbar'>
        <li>
            <img src={image} alt="Next Round's on Me"/>
        </li>
        <li>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </>
  );
}

export default Navigation;