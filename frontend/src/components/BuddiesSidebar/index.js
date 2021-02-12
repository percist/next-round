import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBuddies } from '../../store/buddies'
import Buddies from '../Buddies'
import "./BuddiesSidebar.css"

const BuddiesSidebar = () => {
    const dispatch = useDispatch()
    const buddies = useSelector(fullReduxState => {
        return fullReduxState.buddies;
    });
    
    const {user} =  useSelector(reduxState => {
        return reduxState.session;
    });

    useEffect( () => {
        dispatch(fetchAllBuddies(user.id))
    },[dispatch, user])

    return (
        <div className="buddies-sidebar-container">
            <div className="buddies-sidebar">
            <div className="buddies-sidebar_header">
               <h2>Buddies</h2> 
            </div>
            <div className="buddies-sidebar_feed">
                {(Array.isArray(buddies) && buddies.filter(buddy => {
                    if (buddy.Rounds[0] !== undefined) return buddy;
                }).map(buddy=> {
                    return <Buddies buddy={buddy} key={buddy.id}/>
                }))}
                
            </div>
            </div>
        </div>
    )
}

export default BuddiesSidebar;