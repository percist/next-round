import React, { useState } from 'react';
import SignupForm from "../SignupForm"
import SiteFormPage from "../SiteFormPage"

const SignupFormPage = () => {
    const [ isOwner, setIsOwner ] = useState(false)

    const handleOwnerButtonClick = (e) => {
        e.preventDefault();
        setIsOwner(true);
        return (
            displaySiteFormPage()
        )
    }

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