import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemCardContainer from "../ItemCardContainer";
import RoundsFeedContainer from "../RoundsFeedContainer";
import RoundsSidebar from "../RoundsSidebar";
import BuddiesSidebar from "../BuddiesSidebar";
import { fetchOneSite } from "../../store/sites";
import { fetchAllSiteRounds } from "../../sotre/rounds";
import "./SitePage.css";
import { fetchAllBuddies } from '../../store/buddies';

const SitePage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { siteId } = params;
    const sessionUser = useSelector((state) => state.session.user)
    const [ items, setItems ] = useState([]);

    const site = useSelector(fullReduxState=> {
        return fullReduxState.site;
    })

    useEffect(()=> {
        dispatch(fetchOneSite(siteId))
        dispatch(fetchAllSiteRounds(siteId))
        dispatch(fetchAllBuddies(userId))
    },[dispatch, siteId]);

    useEffect(()=> {
        setItems(site.Item);
    }, [site])

    return (
        <div className="site-page">
            <div className="site-page-header">
                Site image            
            </div>
            <div className="site-page-content">
                <div className="site-page-content-rounds-sidebar">
                    Site Info
                    <RoundsSidebar />
                </div>
                <div className="site-page-content-feed">
                    {/* TODO: map items to item cards */}
                    <ItemCardContainer />
                    <RoundsFeedContainer />
                </div>
                <div className="site-page-content-buddy-sidebar">
                    <BuddiesSidebar />
                </div>
            </div>
        </div>
    )
}

export default SitePage;