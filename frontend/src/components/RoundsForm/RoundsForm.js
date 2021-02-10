import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchAllBuddies } from "../../store/buddies";
import { fetchAllSites } from "../../store/sites";
import { fetchAllSiteItems } from "../../store/items";
import * as sessionActions from "../../store/session";

const RoundsForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [ buddy, setBuddy ] = useState({});
    const [ site, setSite ] = useState('');
    const [ item, setItem ] = useState({});
    const [ siteItems, setSiteItems ] = useState([]);
    const [ total, setTotal ] = useState(0.00);
    const [ errors, setErrors ] = useState([]);
    const [ confirmSubmit, setConfirmSubmit ] = useState(false)
    
    const buddies = useSelector(fullReduxState => {
        return fullReduxState.buddies;
    })

    const sites = useSelector(fullReduxState => {
        return fullReduxState.sites;
    })

    // TODO: create one round and create one round item
    const handleSubmit = (e) => {
        e.preventDefault();
        // createOneRound({
        //     status: "userPaid",
        //     receiverId: buddy.id,
        //     senderId: sessionUser.id, 
        // })
        // .catch(res => {
        //     if (res.data && res.data.errors) setErrors(res.data.errors);
        // });
        // createOneRoundItem({

        // })
        // setConfirmSubmit(true)
    }

    const handleBuddySelect = (e) => {
        setBuddy(e.target.value)
    }

    const handleSiteSelect = (e) => {
        console.log(e.target.value)
        // const selectedSite = e.target.value
        // dispatch(fetchAllSiteItems(selectedSite))
        // setSite(selectedSite)
    }

    const handleItemSelect = (e) => {
        // const selectedItem = e.target.value
        // setItem(selectedItem);
        // setTotal(parseInt(selectedItem.price) / 100)
    }

    const createOneRound = async (round) => {
        const { status, receiverId, senderId } = round;
        const formData = new FormData();
        formData.append("status", status);
        formData.append("receiverId", receiverId);
        formData.append("senderId", senderId);
        const response = await fetch(`api/user/${sessionUser.id}/round`, {
            method: 'POST',
            body: formData
        });
        return response;
    }

    useEffect(() => {
        if (Array.isArray(sites) && site){
            setSiteItems(sites[site - 1].Items) 
        }   
    },[site, dispatch, sites])

    useEffect(() => {
        dispatch(fetchAllBuddies(sessionUser.id));
        dispatch(fetchAllSites())
    },[dispatch, sessionUser])

    return (
        <>
            <h1>Next Round's on Me</h1>
            <h3>Just because you're separated doesn't mean you have to drink alone! Buy a buddy a Round today.</h3>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                {/* TODO: set up a selector with buddies dropdown */}
                <label>
                    Choose a Buddy
                    <select name="buddy" 
                        className="input sign-up-form_input"
                        onChange={(e) => setBuddy(e.target.value)}>
                        <option value="">--Please choose an option--</option>
                        {!buddies && <option value=''>None</option>}
                        {Array.isArray(buddies) && buddies.map(buddy => {
                            return <option value={buddy.id}>{buddy.firstName}</option>
                        })}
                    </select>
                    {/* <input
                        className="input sign-up-form_input"
                        type="select"
                        value={buddy}
                        onChange={(e) => setBuddy(e.target.value)}
                        required
                    /> */}
                </label>
                <label>
                    Choose a Participating Restaurant or Bar
                    <select name="site" 
                        className="input sign-up-form_input"
                        onChange={(e) => setSite(e.target.value)}>
                        <option value="">--Please choose an option--</option>
                        {!sites && <option value=''>None</option>}
                        {Array.isArray(sites) && sites.map(site => {
                            return <option value={site.id}>{site.name}</option>
                        })}
                    </select>
                </label>
                <label>
                    Choose an Item off their Menu
                    <select name="item" 
                        className="input sign-up-form_input"
                        onChange={(e) => setItem(e.target.value)}>
                        <option value="">--Please choose an option--</option>
                        {!siteItems && <option value=''>None</option>}
                        {Array.isArray(siteItems) && siteItems.map(item => {
                            return (
                            <option value={`${item.id}`}>
                                {`${item.name} $${item.price / 100}`}
                            </option>
                        )})}
                    </select>
                </label>
                <label>
                    Total for this round: {item.price ?  `$${item.price / 100}` : "$0.00"}
                    {/* TODO:  */}
                </label>
                <button
                    className="button"
                    id="sign-up-form_button"
                    type="submit"
                >
                    Buy Now
                </button>
            </form>
        </>)
}

export default RoundsForm;