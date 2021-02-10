import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBuddies } from '../../store/buddies'
import Buddies from '../Buddies'
import "./BuddiesSidebar.css"

const BuddiesSidebar = ({user}) => {
    const dispatch = useDispatch()
    const buddies = useSelector(fullReduxState => {
        return fullReduxState.buddies;
    });
    
    useEffect( () => {
        dispatch(fetchAllBuddies(user.id))
    },[dispatch, user])

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