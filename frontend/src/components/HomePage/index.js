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
        <>
            <div className="home-page">
                <RoundsSidebar user={user}/>
                <RoundsFeed rounds={rounds}/>
                <BuddiesSidebar user={user}/>
            </div>
        </>
    )
}

export default HomePage