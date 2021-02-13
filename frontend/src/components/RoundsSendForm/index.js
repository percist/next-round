import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchAllBuddies } from "../../store/users";
import { fetchAllSites } from "../../store/sites";
import { createOneRound } from "../../store/rounds";
import { IoPersonCircleOutline } from 'react-icons/io5';
import { FcShop, FcDecision } from 'react-icons/fc';
import './RoundsSendForm.css'

const RoundsSendForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [buddyId, setBuddyId] = useState(''); // sets buddy id (integer)
    const [buddy, setBuddy] = useState({}) // sets a single buddy object
    const [buddyImage, setBuddyImage] = useState('') // sets a single buddy object
    const [site, setSite] = useState({}); // sets site object
    const [siteImage, setSiteImage] = useState(''); // sets site image url
    const [item, setItem] = useState([]); // sets an array with a single item object
    const [itemImage, setItemImage] = useState(""); // sets site image url
    const [siteItems, setSiteItems] = useState([]); // sets an array of item objects
    const [total, setTotal] = useState(0.00); // sets an integer
    const [buddySelected, setBuddySelected] = useState(false) //sets whether a buddy has been selected (in case they don't have a pic);
    const [siteSelected, setSiteSelected] = useState(false) //sets whether a site has been selected (in case it doesn't have a pic);
    const [itemSelected, setItemSelected] = useState(false) //sets whether a item has been selected (in case it doesn't have a pic);
    const [errors, setErrors] = useState([]);
    const [confirmSubmit, setConfirmSubmit] = useState(false);

    const buddies = useSelector(fullReduxState => {
        return fullReduxState.users;
    })

    const sites = useSelector(fullReduxState => {
        return fullReduxState.sites;
    })

    const round = useSelector(fullReduxState => {
        return fullReduxState.round;
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!buddyId || !item[0] || !site) {
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
        setBuddy({})
        setSite({})
        setItem({})
        setBuddySelected(false)
        setSiteSelected(false)
        setItemSelected(false)
    }

    const handleBuddySelect = (e) => {
        if (e) {
            const buddyId = e
            const selectedBuddy = buddies.filter(buddy => buddy.id == buddyId);
            setBuddy(selectedBuddy[0])
        } else {
            setBuddy({})
        }
        setBuddySelected(true)
    }

    const handleItemSelect = (e) => {
        if (e) {
            const itemId = e
            const selectedItem = siteItems.filter(item => item.id == itemId);
            setItem(selectedItem[0])
        } else {
            setItem({})
        }
        setItemSelected(true)
    }

    const handleSiteSelect = (e) => {
        if (e) {
            const siteId = e
            const selectedSite = sites.filter(site => site.id == siteId);
            setSite(selectedSite[0])
        } else {
            setSite({})
        }
        setSiteSelected(true)
    }

    useEffect(() => {
        setBuddyImage(buddy.imgUrl)
    }, [buddy])

    useEffect(() => {
        setItemImage(item.imgUrl)
    }, [item])

    useEffect(() => {
        setSiteImage(site.imgUrl)
    }, [site])

    useEffect(() => {
        if (Array.isArray(sites) && site) {
            setSiteItems(site.Items);
        }
    }, [site, dispatch, sites]);

    useEffect(() => {
        dispatch(fetchAllBuddies(sessionUser.id));
        dispatch(fetchAllSites());
    }, [dispatch, sessionUser]);

    useEffect(() => {
        if (item[0]) {
            setTotal(item[0].price)
        }
    }, [item])

    return (
        <div className="rounds-send">
            <div className="rounds-send-form">
                <h3>Just because you're separated doesn't mean you have to drink alone! Buy a buddy a Round today.</h3>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className="rounds-send-form_inputs">
                        <div className="rounds-send-form_inputs_buddy">
                            <label>
                                Choose a Buddy
                            </label>
                                <select name="buddy"
                                    className="input sign-up-form_input"
                                    onChange={(e) => handleBuddySelect(e.target.value)}>
                                    <option value="">--Please choose an option--</option>
                                    {!buddies && <option value=''>None</option>}
                                    {Array.isArray(buddies) && buddies.map(buddy => {
                                        return <option value={buddy.id}>{buddy.firstName}</option>
                                    })}
                                </select>
                            </div>
                            <div className="rounds-send-form_inputs_site">
                                <label>
                                    Choose a Participating Restaurant or Bar
                                </label>
                                <select name="site"
                                    className="input sign-up-form_input"
                                    onChange={(e) => handleSiteSelect(e.target.value)}>
                                    <option value="">--Please choose an option--</option>
                                    {!sites && <option value=''>None</option>}
                                    {Array.isArray(sites) && sites.map(site => {
                                        return <option value={site.id}>{site.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="rounds-send-form_inputs_item">
                                <label>
                                    Choose an Item off their Menu
                                </label>
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
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    <div className="round-send-details">
                        <div id="round-send-details_user">
                            <h2>{buddy.username}</h2>
                            {!buddy.imgUrl && <FcDecision />}
                            {buddy.imgUrl && <img src={buddy.imgUrl} alt="buddy" />}
                        </div>
                        <div id="round-send-details_site">
                            <h2>{site.name}</h2>
                            {!siteImage && <FcShop />}
                            {siteImage && <img src={siteImage} alt="site" />}
                        </div>
                        <div id="round-send-details_item">
                            <h2>{item.name}</h2>
                            {!itemImage && <img src="https://img.icons8.com/fluent/96/000000/beer-glass.png"/>}
                            {itemImage && <img src={itemImage} alt="item" />}
                        </div>
                    </div>
                    <div id="round-send-details_price">
                        <label>
                            Total for this round: {total ? `$${total / 100}` : "$0.00"}
                        </label>
                        <button
                            className="button"
                            id="sign-up-form_button"
                            type="submit"
                            >
                            Buy Now
                        </button>
                    </div>
                </form>
                <div className="round-confirmation" hidden={!confirmSubmit}>
                    Purchase Details:
                    {item[0] && buddy.firstName && ` ${item[0].name} sent to ${buddy.firstName}`}
                </div>
            </div>
        </div>
    )
}

export default RoundsSendForm;