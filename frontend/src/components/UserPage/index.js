import React from 'react';
import BuddiesSidebar from '../BuddiesSidebar';
import FiltersSelector from '../FiltersSelector';
import RoundsSidebar from '../RoundsSidebar';
import SiteFeed from '../SiteFeed';
import "./UserPage.css"

const UserPage = () => {

    
    return (
        <div className="user-page">
            <div className="user-page-rounds_sidebar">
                <FiltersSelector />
                <RoundsSidebar />
            </div>
            <div className="user-page-site_feed">
                User Page
                <SiteFeed />
            </div>
            <div className="user-page-buddies_sidebar">
                <BuddiesSidebar />
            </div>
        </div>
    )
}

export default UserPage;