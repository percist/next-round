import React, {useEffect, useState} from 'react';
import RoundsFeedContainer from '../RoundsFeedContainer';
import RoundsSidebar from '../RoundsSidebar';
import BuddiesSidebar from '../BuddiesSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { restoreUser } from '../../store/session'
import "./HomePage.css"

const HomePage = () => {

    const dispatch = useDispatch();

    const {user} =  useSelector(reduxState => {
        return reduxState.session;
    });

    return (
        <>
            <div className="home-page">
                <RoundsSidebar user={user}/>
                <RoundsFeedContainer user={user}/>
                <BuddiesSidebar user={user}/>
            </div>
        </>
    )
}

export default HomePage