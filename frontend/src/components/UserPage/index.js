import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuddiesSidebar from '../BuddiesSidebar';
import FiltersSelector from '../FiltersSelector';
import RoundsSidebar from '../RoundsSidebar';
import SiteFeed from '../SiteFeed';
import { fetchAllSites } from '../../store/sites';
import "./UserPage.css"

const UserPage = () => {
    const dispatch = useDispatch();

    const sites = useSelector(fullReduxState=> {
        return fullReduxState.sites
    })

    useEffect(() => {
        dispatch(fetchAllSites)
    },[dispatch])
    
    return (
        <div className="user-page">
            <div className="user-page-rounds_sidebar">
                <FiltersSelector />
                <RoundsSidebar />
            </div>
            <div className="user-page-site_feed">
                User Page
                <SiteFeed sites={sites}/>
            </div>
            <div className="user-page-buddies_sidebar">
                <BuddiesSidebar />
            </div>
        </div>
    )
}

export default UserPage;