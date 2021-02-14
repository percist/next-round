import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupForm from "../SignupForm"
import SiteFormPage from "../SiteFormPage"

const SignupFormPage = () => {
    const [ isOwner, setIsOwner ] = useState(false)
    const sessionUser = useSelector((state) => state.session.user);

    const handleOwnerButtonClick = (e) => {
        e.preventDefault();
        setIsOwner(true);
        return (
            displaySiteFormPage()
        )
    }

    if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`} />;

    const displaySiteFormPage = () => {
        if (isOwner) return <SiteFormPage />
    }


    return (
        <>
            <SignupForm />
            <button className="button" id="owner-button" onClick={(e)=>handleOwnerButtonClick(e)}>
                Click here to register your business
            </button>
            {displaySiteFormPage()}
        </>
    )
}

export default SignupFormPage