import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBuddies } from "../../store/users";
import { fetchAllSites } from "../../store/sites";
import { createOneRound } from "../../store/rounds";
import ItemImage from '../ItemImage';
import UserImage from '../UserImage';
import {FaUserCircle, IoStorefront} from 'react-icons/all';
import './RoundsSendForm.css';

const RoundsSendForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [buddy, setBuddy] = useState({}); // sets a single buddy object
  const [buddyImage, setBuddyImage] = useState(''); // sets a single buddy object
  const [site, setSite] = useState({}); // sets site object
  const [siteImage, setSiteImage] = useState(''); // sets site image url
  const [item, setItem] = useState([]); // sets an array with a single item object
  const [itemImage, setItemImage] = useState(""); // sets site image url
  const [siteItems, setSiteItems] = useState([]); // sets an array of item objects
  const [total, setTotal] = useState(0.00); // sets an integer
  const [buddySelected, setBuddySelected] = useState(false); //sets whether a buddy has been selected (in case they don't have a pic);
  const [siteSelected, setSiteSelected] = useState(false); //sets whether a site has been selected (in case it doesn't have a pic);
  const [itemSelected, setItemSelected] = useState(false); //sets whether a item has been selected (in case it doesn't have a pic);
  const [errors, setErrors] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const buddies = useSelector(state => state.users);
  const sites = useSelector(state => state.sites);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buddy || !item || !site) {
      return setErrors(['Please select a buddy, site, and item to send a round.']);
    };
    setErrors([]);
    await dispatch(createOneRound({
      receiverId: buddy.id,
      itemId: item.id
    }))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    setConfirmSubmit(true);
    setPurchaseDetails([buddy, site, item]);
    setBuddy({});
    setSite({});
    setItem({});
    setBuddySelected(false);
    setSiteSelected(false);
    setItemSelected(false);
  }

  const resetForm = () => {
    setConfirmSubmit(false);
    setPurchaseDetails([]);
  }
  
  const handleBuddySelect = (e) => {
    if (e) {
      const buddyId = e;
      const selectedBuddy = buddies.filter(buddy => buddy.id == buddyId);
      setBuddy(selectedBuddy[0]);
      setPurchaseDetails([]);
    } else {
      setBuddy({});
    }
    resetForm();
    setBuddySelected(true);
  }

  const handleItemSelect = (e) => {
    if (e) {
      const itemId = e;
      const selectedItem = siteItems.filter(item => item.id == itemId);
      setItem(selectedItem[0]);
      setTotal(selectedItem[0].price);
      setPurchaseDetails([]);
    } else {
      setItem({});
    }
    resetForm();
    setItemSelected(true);
  }

  const handleSiteSelect = (e) => {
    if (e) {
      const siteId = e;
      const selectedSite = sites.filter(site => site.id == siteId);
      setSite(selectedSite[0]);
      setPurchaseDetails([]);
    } else {
      setSite({});
      setItem({});
    }
    resetForm();
    setSiteSelected(true);
  }

  useEffect(() => {
    setBuddyImage(buddy.imgUrl);
  }, [buddy])

  useEffect(() => {
    setItemImage(item.imgUrl);
  }, [item])

  useEffect(() => {
    setSiteImage(site.imgUrl);
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
      setTotal(item[0].price);
    }
  }, [item])

  return (
    <div className="rounds-send-page">
      <h2>Just because you're separated doesn't mean you have to drink alone </h2>
      <div className="rounds-send-body">
        <div className="rounds-send-form">

          <form onSubmit={handleSubmit}>
          <h3>Send a buddy a round today </h3>
            <div className="rounds-send-form_inputs">
              <div id="rounds-send-form_inputs_buddy">
                <label>
                  Choose a Buddy
                              </label>
                <select 
                  name="buddy"
                  className="input sign-up-form_input"
                  onChange={(e) => handleBuddySelect(e.target.value)}
                  >
                  <option value="">--Please choose a buddy--</option>
                  {!buddies && <option value=''>None</option>}
                  {Array.isArray(buddies) && buddies.map(buddy => {
                    return <option value={buddy.id} key={buddy.id}>{buddy.firstName}</option>
                  })}
                </select>
              </div>
              <div id="rounds-send-form_inputs_site">
                <label>
                  Choose a Participating Restaurant or Bar
                                  </label>
                <select 
                  name="site"
                  className="input sign-up-form_input"
                  onChange={(e) => handleSiteSelect(e.target.value)}
                  >
                  <option value="">--Please choose an option--</option>
                  {!sites && <option value=''>None</option>}
                  {Array.isArray(sites) && sites.map(site => {
                    return <option value={site.id} key={site.id}>{site.name}</option>
                  })}
                </select>
              </div>
              <div id="rounds-send-form_inputs_item">
                <label>
                  Choose an Item off their Menu
                                  </label>
                <select 
                  name="item"
                  className="input sign-up-form_input"
                  onChange={(e) => handleItemSelect(e.target.value)}
                  >
                  <option value="">--Please choose an option--</option>
                  {!siteItems && <option value=''>None</option>}
                  {Array.isArray(siteItems) && siteItems.map(item => {
                    return (
                      <option value={`${item.id}`} key={item.id}>
                        {`${item.name} $${item.price / 100}`}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div id="round-send-details_price">
              <label>
                Total for this round: {total ? `$${total / 100}` : "$0.00"}
              </label>
              <button
                className="button"
                id="round-send-form_button"
                type="submit"
                aria-label="buy round now"
                hidden={!buddySelected || !siteSelected || !itemSelected}
              >
                Buy Now
                          </button>
            </div>
          </form>
        </div>
        <div className="round-send-mockup">
          <div id="round-send-mockup_item">
           <ItemImage image={itemImage} alt="item" />
          </div>
          <div id="round-send-mockup_details">
            <h2>{item.name}</h2>
              <h2>{site.name}</h2>
            <div id="round-send-mockup_details_user">
            <div id="round-send-mockup_details_user_image">
              {!buddyImage && <FaUserCircle className="icon" />}
              {buddyImage && <UserImage user={buddy} />}
              </div>
              <h2>{buddy.username}</h2>
            </div>
          </div>
            <div id="round-send-mockup_details_site">
              <div id="round-send-mockup_details_site_image">
              {!siteImage && <IoStorefront className="icon" /> }
              {siteImage && <img src={siteImage} alt="site" />}
              </div>
            </div>
        </div>
        <div className="round-confirmation" hidden={!confirmSubmit}>
          <h2 hidden={!confirmSubmit}>Congrats, You just sent a Round!</h2>
          <h2 hidden={!confirmSubmit}>Purchase Details:</h2>
          <h3>{purchaseDetails[0] && `${purchaseDetails[2].name} sent to ${purchaseDetails[0].username}`}</h3>
        </div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
    </div>
  )
};

export default RoundsSendForm;