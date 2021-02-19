import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupForm from "../SignupForm"

const SignupFormPage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`} />;


  return (
    <div id="signup-form">
      <SignupForm />
    </div>
  )
}

export default SignupFormPage