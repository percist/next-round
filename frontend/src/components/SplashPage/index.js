import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginForm';
import SignupFormPage from '../SignupFormPage';
import * as sessionActions from "../../store/session";
import "./index.css"


const SplashPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [userId, setUserId] = useState("")
  const [form, setForm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (sessionUser) setUserId(sessionUser.id)
  }, [sessionUser])

  if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`} />;

  function handleSignupClick(e) {
    e.preventDefault();
    setForm("signup");
    setShowModal("true");
  }

  function handleLoginClick(e) {
    e.preventDefault();
    setForm("login");
    setShowModal("true");
  }

  const handleDemoClick = async (e) => {
    e.preventDefault();
    return dispatch(sessionActions.loginDemo())
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
  };

  return (
    <div className="splash-page">
      <div className="splash-page_img">
        <img src='./N.png' alt="logo" />
        <div className="splash-page-overlay" id="splash-page-overlay">
          <div id="splash-page-cta">
            <h1 id="splash-page-cta_1">
              Drink together even when you're apart
                        </h1>
            <div id="splash-page-cta_buttons">
              <button
                className="button"
                id="splash-page-cta_2"
                onClick={handleLoginClick}
              >
                Login
                            </button>
              <button
                className="button"
                id="splash-page-cta_3"
                onClick={handleSignupClick}
              >
                SignUp
                            </button>
              <button
                className="button"
                id="splash-page-cta_4"
                onClick={handleDemoClick}
              >
                Demo
                            </button>
            </div>
          </div>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              { form === "login" && (
                <LoginForm />
              )}
              { form === "signup" && (
                <SignupFormPage />
              )}
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default SplashPage;