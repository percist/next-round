import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewSite } from '../../store/sites'

const SiteFormPage = ( ) => {
    const dispatch = useDispatch();

    const [ name, setName ] = useState("")
    const [ address, setAddress ] = useState("")
    const [ city, setCity ] = useState("")
    const [ state, setState ] = useState("")
    const [ image, setImage ] = useState(null)
    const [ website, setWebsite ] = useState("")
    const [ zip, setZip ] = useState("")
    const [ isActive, setIsActive ] = useState(false)
    const [ errors, setErrors ] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(createNewSite({
            name,
            address,
            city,
            state,
            image,
            website,
            zip,
            active: isActive
        }))
        .catch(res => {
            if (res.data && res.data.errors) setErrors(res.data.errors);
        });
        }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file)
    }
    
    return (
        <>
            <h1>Register your Business</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Name
                    <input
                        className="input site-creation-form_input"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Address
                    <input
                        className="input site-creation-form_input"
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        className="input site-creation-form_input"
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        className="input site-creation-form_input"
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Zip Code
                    <input
                        className="input site-creation-form_input"
                        type="integer"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Website
                    <input
                        className="input site-creation-form_input"
                        type="text"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Profile Picture
                    <input
                        className="input site-creation-form_input"
                        type="file"
                        onChange={updateFile}
                    />
                </label>
                <label>
                    isActive
                    <input
                        className="input site-creation-form_input"
                        type="select"
                        id="active"
                        onChange={(e) => setIsActive(e.target.value)}
                        required
                    />
                </label>
                <button 
                    className="button"
                    id="site-creation-form_button"
                    type="submit"
                    >
                        Create Your Business
                </button>
            </form>        
        </>
    )
}
export default SiteFormPage;