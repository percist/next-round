import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBuddies } from '../../store/buddies'
import Buddies from '../Buddies'

const BuddiesSidebar = ({user}) => {
    const dispatch = useDispatch()
    const buddies = useSelector(fullReduxState => {
        return fullReduxState.buddies;
    });
    
    useEffect( () => {
        dispatch(fetchAllBuddies(user.id))
    },[dispatch, user])

    console.log(buddies)
    //TODO: fetch and set in state the users' buddies join rounds order most recent limit 1
    //TODO: map over buddy state and send to buddies component
    let buddy;
    return (
        <div className="buddies-sidebar">
            <div className="buddies-sidebar_header">
                My Buddies:
            </div>
            <div className="buddies-sidebar_feed">
                {(Array.isArray(buddies) && buddies.map(buddy=> {
                    return <Buddies buddy={buddy} key={buddy.id}/>
                }))}
                
            </div>
        </div>
    )
}

export default BuddiesSidebar;