import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const RoundsSidebar = () => {
  const history = useHistory();

  const { user } = useSelector(reduxState => {
    return reduxState.session;
  });

  const [numRounds, setNumRounds] = useState({});
  const [sitesOwned, setSitesOwned] = useState({});

  useEffect(() => {
    const fetchPaidRounds = async () => {
      const response = await fetch('/api/rounds/user/total')
      const roundsToRedeem = await response.json()
      setNumRounds(roundsToRedeem)
    }
    const fetchOwnedSites = async () => {
      const response = await fetch('/api/sites/user')
      const sitesUserOwns = await response.json()
      console.log(sitesUserOwns.sites)
      setSitesOwned(sitesUserOwns)
    }
    fetchPaidRounds()
    fetchOwnedSites()
  }, []);

  const redeemRoundClickHandler = () => {
    history.push(`/users/${user.id}/round`);
  }

  const buyRoundClickHandler = () => {
    history.push("/users/round");
  }

  return (
    <div hidden={sitesOwned} className="rounds-sidebar">
      <div className="rounds-sidebar_sites-owned">
        Your Businesses:
                {!Array.isArray(sitesOwned.sites) && "loading..."}
        {Array.isArray(sitesOwned.sites) && sitesOwned.sites.map(owner => {
          return <div id="rounds-sidebar_site" key={owner.siteId}>
            <a href={`/sites/${owner.siteId}`}>
              {owner.Site.name}
            </a>
          </div>
        })}
      </div>
      <div id="rounds-sidebar_username">
        {user.username}
      </div>
      <div id="rounds-sidebar_rounds-waiting">
        {`you have ${numRounds} rounds waiting`}
      </div>
      <button
        className="button"
        id="button-redeem-round"
        onClick={redeemRoundClickHandler}
      >
        Claim a Round
            </button>
      <button
        className="button"
        id="button-buy-round"
        onClick={buyRoundClickHandler}
      >
        Send a Round
            </button>
    </div>

  )

}

export default RoundsSidebar;