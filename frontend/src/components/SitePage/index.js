import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ItemCardContainer from "../ItemCardContainer";
import RoundsFeed from "../RoundsFeed";
import { fetchOneSite } from "../../store/sites";
import { fetchAllSiteRounds } from "../../store/rounds";
import { checkIsOwner } from './SitePageUtils';
import headerImg from '../../DefaultHeader.png';
import largeSpinner from '../../Spinner-1s-617px.gif';
import "./SitePage.css";

const SitePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const { siteId } = params;
  const user = useSelector((state) => state.session.user);
  const rounds = useSelector(state => state.rounds);
  const site = useSelector(state => state.sites);
  const [imgUrl, setImgUrl] = useState(headerImg);
  const [items, setItems] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const updateMenuHandler = () => history.push(`/sites/${site.id}/menu`);

  useEffect(() => {
    checkIsOwner(user, siteId, setIsOwner);
    dispatch(fetchOneSite(siteId));
    dispatch(fetchAllSiteRounds(siteId));
  }, [dispatch, siteId, user]);

  useEffect(() => {
    setItems(site.Items);
    if(site.imgUrl) setImgUrl(site.imgUrl);
  }, [site]);

  return (
    <div className="site-page">
      <div className="site-page-header">
        {!imgUrl && <img src={largeSpinner} alt="loading..." />}
        {imgUrl && <img src={imgUrl} alt={site.name} />}
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
              {site.website && site.website.split('www.')[1]}
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