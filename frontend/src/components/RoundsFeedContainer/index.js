import React, {useEffect, useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBuddyRounds } from '../../store/rounds';
import RoundsFeed from '../RoundsFeed';

const RoundsFeedContainer = ({ user }) => {
    const dispatch = useDispatch();

    const rounds = useSelector(reduxState => {
        return reduxState.rounds;
    });
    useEffect(() => {
        if (user){
            dispatch(fetchAllBuddyRounds(user.id))
        }
    },[dispatch, user])
    
    return <RoundsFeed rounds={rounds} />
}

export default RoundsFeedContainer;