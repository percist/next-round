import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchAllBuddies } from "../../store/users";
import { fetchAllSites } from "../../store/sites";
import { fetchAllSiteItems } from "../../store/items";
import { createOneRound } from "../../store/rounds";
import * as sessionActions from "../../store/session";

const RoundsSendForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [ buddyId, setBuddyId ] = useState(''); // sets buddy id (integer)
    const [ buddy, setBuddy ] = useState({})
    const [ site, setSite ] = useState(''); // sets site id
    const [ item, setItem ] = useState([]); // sets an array with a single item object
    const [ siteItems, setSiteItems ] = useState([]); // sets an array of item objects
    const [ total, setTotal ] = useState(0.00); // sets an integer
    const [ errors, setErrors ] = useState([]);
    const [ confirmSubmit, setConfirmSubmit ] = useState(false);
    
    const buddies = useSelector(fullReduxState => {
        return fullReduxState.users;
    })

    const sites = useSelector(fullReduxState => {
        return fullReduxState.sites;
    })

    const round = useSelector(fullReduxState => {
        return fullReduxState.round;
    })

    // TODO: create one round and create one round item
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!buddyId || !item[0] || !site){
            return setErrors(['Please select a buddy, site, and item to send a round.'])
        }
        setErrors([]);
        await dispatch(createOneRound({
            receiverId: buddyId,
            itemId: item[0].id 
        }))
        .catch(res => {
            if (res.data && res.data.errors) setErrors(res.data.errors);
        });
        setConfirmSubmit(true)
    }
    
    const handleItemSelect = (e) => {
        const itemId = e
        setItem(siteItems.filter(item => item.id == itemId))
    }

    useEffect(() => {
        if (Array.isArray(sites) && site){
            setSiteItems(sites[site - 1].Items);
        }   
    },[site, dispatch, sites]);

    useEffect(() => {
        dispatch(fetchAllBuddies(sessionUser.id));
        dispatch(fetchAllSites());
    },[dispatch, sessionUser]);

    useEffect(() => {
        if (item[0]) {
            setTotal(item[0].price)    
        }    
    }, [item])

    useEffect(() => {
        if (buddyId) {
            setBuddy(buddies.filter(buddy => buddy.id == buddyId)[0])}
            console.log(buddy)
    }, [buddyId])

    return (
        <>
            <h3>Just because you're separated doesn't mean you have to drink alone! Buy a buddy a Round today.</h3>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Choose a Buddy
                    <select name="buddy" 
                        className="input sign-up-form_input"
                        onChange={(e) => setBuddyId(e.target.value)}>
                        <option value="">--Please choose an option--</option>
                        {!buddies && <option value=''>None</option>}
                        {Array.isArray(buddies) && buddies.map(buddy => {
                            return <option value={buddy.id}>{buddy.firstName}</option>
                        })}
                    </select>
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
                        onChange={(e) => handleItemSelect(e.target.value)}>
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
                    Total for this round: {total ?  `$${total / 100}` : "$0.00"}
                </label>
                <button
                    className="button"
                    id="sign-up-form_button"
                    type="submit"
                >
                    Buy Now
                </button>
            </form>
            <div className="round-confirmation" hidden={!confirmSubmit}>
                Purchase Details:
                {item[0] && buddy.firstName && ` ${item[0].name} sent to ${buddy.firstName}`}
            </div>
        </>)
}

export default RoundsSendForm;