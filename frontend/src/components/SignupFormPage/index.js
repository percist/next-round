import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupForm from "../SignupForm"
import SiteFormPage from "../SiteFormPage"

const SignupFormPage = () => {
  const [isOwner, setIsOwner] = useState(false)
  const [clickedBusiness, setClickedBusiness] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);

  const handleOwnerButtonClick = (e) => {
    e.preventDefault();
    setIsOwner(true);
    setClickedBusiness(true);
    return (
      displaySiteFormPage()
    )
  }

  if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`} />;

  const displaySiteFormPage = () => {
    if (isOwner) return <SiteFormPage clickedBusiness={clickedBusiness} setClickedBusiness={setClickedBusiness}/>
  }


  return (
    <div id="signup-form">
      <SignupForm />
      <button 
        className="button" 
        id="owner-button" 
        hidden={clickedBusiness}
        onClick={(e) => handleOwnerButtonClick(e)}
      >
        Business Owner?
            </button>
      {displaySiteFormPage()}
    </div>
  )
}

export default SignupFormPage