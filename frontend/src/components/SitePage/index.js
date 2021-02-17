import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ItemCardContainer from "../ItemCardContainer";
import RoundsSidebar from "../RoundsSidebar";
import RoundsFeed from "../RoundsFeed";
import { fetchOneSite } from "../../store/sites";
import { fetchAllSiteRounds } from "../../store/rounds";
import "./SitePage.css";

const SitePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const { siteId } = params;
  const user = useSelector((state) => state.session.user)
  const [items, setItems] = useState([]);
  const [isOwner, setIsOwner] = useState(false)

  const site = useSelector(fullReduxState => {
    return fullReduxState.sites;
  })

  const rounds = useSelector(fullReduxState => {
    return fullReduxState.rounds;
  })

  const updateMenuHandler = () => {
    history.push(`/sites/${site.id}/menu`)
  }

  useEffect(() => {
    const checkIsOwner = async () => {
      const response = await fetch(`/api/sites/${siteId}/owners`)
      const owners = await response.json();
      if (Array.isArray(owners.siteOwners)) {
        owners.siteOwners.forEach(owner => {
          if (owner.userId === user.id) setIsOwner(true)
        })
      }
    }
    checkIsOwner(user.id)
    dispatch(fetchOneSite(siteId))
    dispatch(fetchAllSiteRounds(siteId))
  }, [dispatch, siteId, user]);

  useEffect(() => {
    setItems(site.Items);
  }, [site])

  return (
    <div className="site-page">
      <div className="site-page-header">
        <img src={site.imgUrl} alt={site.name} />
        <h1>{site.name}</h1>
      </div>
      <div className="site-page-content">
        <div className="site-page-content-rounds-sidebar">
          {isOwner && <button
            onClick={updateMenuHandler}
            className="button update-menu-button"
          >
            Update menu
                        </button>
          }
          <div id="site-page-content-rounds-sidebar_info">
            <h2>About</h2>
            <div>
              {site.address}
            </div>
            <div>
              {`${site.city}, ${site.state}`}
            </div>
            <a href={`${site.website}`}>
              {site.website}
            </a>
          </div>
        </div>
        <div className="site-page-content-feed">
          <ItemCardContainer items={items} />
          <RoundsFeed rounds={rounds} site={site} type="site" />
        </div>
      </div>
    </div>
  )
}

export default SitePage;