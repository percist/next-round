import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemCardContainer from "../ItemCardContainer";
import RoundsFeed from "../RoundsFeed";
import RoundsSidebar from "../RoundsSidebar";
import BuddiesSidebar from "../BuddiesSidebar";
import { fetchOneSite } from "../../store/sites";
import { fetchAllSiteRounds } from "../../store/rounds";
import "./SitePage.css";

const SitePage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { siteId } = params;
    const user = useSelector((state) => state.session.user)
    const [ items, setItems ] = useState([]);
    const [ isOwner, setIsOwner ] = useState(false)

    const site = useSelector(fullReduxState=> {
        return fullReduxState.sites;
    })

    const rounds = useSelector(fullReduxState=> {
        return fullReduxState.rounds;
    })

    useEffect(()=> {
        const checkIsOwner= async() => {
            const response = await fetch(`api/sites/${siteId}/owners`)
            const owners = await response.json();
            console.log(owners)
            // if (owners.includes(user.id)){
            //     setIsOwner(true)
            // }
        }
        checkIsOwner(user.id)
        dispatch(fetchOneSite(siteId))
        dispatch(fetchAllSiteRounds(siteId))
    },[dispatch, siteId, user]);

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
                    <RoundsSidebar user={user}/>
                </div>
                <div className="site-page-content-feed">
                    {/* TODO: map items to item cards */}
                    <ItemCardContainer />
                    <RoundsFeed rounds={rounds} site={site}/>
                </div>
                <div className="site-page-content-buddy-sidebar">
                    <BuddiesSidebar user={user}/>
                </div>
            </div>
        </div>
    )
}

export default SitePage;