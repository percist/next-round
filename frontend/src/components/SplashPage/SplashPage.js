import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginForm';
import SignupFormPage from '../SignupFormPage';
import "./index.css"


const SplashPage = () => {

    const [form, setForm] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    const history = useHistory();
    
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
    return (
        <div className="splash-page">
            <div className="splash-page_img">
                <img src='./N.png' />
                <div class="splash-page-overlay" id="splash-page-overlay">
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