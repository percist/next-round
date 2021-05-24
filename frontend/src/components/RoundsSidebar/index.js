import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { FaGlassCheers, IoStorefront } from 'react-icons/all';
import UserImage from '../UserImage';
import SiteFormPage from '../SiteFormPage';
import { useHistory } from 'react-router-dom';
import { fetchOwnedSites, fetchPaidRounds } from './RoundsSidebarUtils';
import spinner from  '../../Spinner-1s-44px.gif'
import '../../context/Modal.css';

const RoundsSidebar = () => {
  const history = useHistory();

  const { user } = useSelector(state => state.session);

  const [showModal, setShowModal] = useState(false);
  const [numRounds, setNumRounds] = useState('');
  const [sitesOwned, setSitesOwned] = useState({});

  useEffect(() => {
    fetchPaidRounds(setNumRounds)
    fetchOwnedSites(setSitesOwned)   
  }, []);

  const redeemRoundClickHandler = () => history.push(`/users/${user.id}/round`);
  const buyRoundClickHandler = () => history.push("/users/round");
  
  return (
    <div hidden={sitesOwned} className="rounds-sidebar">
      <div className="rounds-sidebar_user">
        <UserImage user={user} />
        {user.username}
      </div>

      <button
        className="button"
        id="button-redeem-round"
        label="reedem a round"
        onClick={redeemRoundClickHandler}
      >
        <div id="button-redeem-round-icon">
          <img
            id="button-redeem-round-image"
            src="https://img.icons8.com/fluent/96/000000/beer-glass.png"
            alt="beer"
          />
          {numRounds}
        </div>
        Claim a Round
      </button>
      <button
        className="button"
        id="button-buy-round"
        label="buy a round"
        onClick={buyRoundClickHandler}
      >
        <div id="button-buy-round-icon">
          <FaGlassCheers
            id="button-buy-round-image"
          />
        </div>
        Send a Round
      </button>
      <button
        className="button"
        id="button-signup-site"
        label="sign up a new site"
        onClick={() => setShowModal(true)}
      >
        <div id="button-signup-site-icon">
          <IoStorefront
            id="button-signup-site-image"
          />
        </div>
        Create Business
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SiteFormPage />
        </Modal>
      )}
      <div className="rounds-sidebar_sites-owned">
        <hr />
        Your Businesses
        {!Array.isArray(sitesOwned.sites) && <img src={spinner} alt="loading..."/>}
        {Array.isArray(sitesOwned.sites) && sitesOwned.sites.map(owner => {
          return (
            <div className="rounds-sidebar_site" key={owner.siteId}>
              <a className="rounds-sidebar_site-link" href={`/sites/${owner.siteId}`}>
                <img className="rounds-sidebar_image rounds-sidebar_site_image" src={owner.Site.imgUrl} alt="site" />
                {owner.Site.name}
              </a>
            </div>
        )})}
      </div>
    </div>

  )

}

export default RoundsSidebar;