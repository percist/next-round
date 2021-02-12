import React, {useEffect, useState} from 'react';
import RoundsFeed from '../RoundsFeed';
import RoundsSidebar from '../RoundsSidebar';
import BuddiesSidebar from '../BuddiesSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBuddyRounds } from '../../store/rounds';
import "./HomePage.css"

const HomePage = () => {

    const dispatch = useDispatch();

    const {user} =  useSelector(reduxState => {
        return reduxState.session;
    });

    const rounds = useSelector(reduxState => {
        return reduxState.rounds;
    });

    useEffect(() => {
        dispatch(fetchAllBuddyRounds(user.id))
    },[dispatch, user])

    return (
        <div className="user-page">
            <div className="user-page-rounds_sidebar">
            <RoundsSidebar />
            </div>
            <div className="user-page-site_feed">
                <RoundsFeed rounds={rounds}/>
            </div>
            <div className="user-page-buddies_sidebar">
            <BuddiesSidebar />
            </div>
        </div>
    )
}

export default HomePage