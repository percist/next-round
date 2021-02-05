import React from 'react';
import PostsFeedContainer from '../PostsFeedContainer';
import RoundsSidebar from '../RoundsSidebar';
import BuddiesSidebar from '../BuddiesSidebar';
import "./HomePage.css"
import { useSelector } from 'react-redux';

const HomePage = () => {

    const {user} =  useSelector(reduxState => {
        return reduxState.session;
      });

    return (
    <div className="home-page">
        <RoundsSidebar user={user}/>
        <PostsFeedContainer user={user}/>
        <BuddiesSidebar user={user}/>
    </div>
    )
}

export default HomePage