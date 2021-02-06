import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'

const RoundsSidebar = (user) => {

    //TODO: route to fetch most recently created round with status: paid with a buddy of the current user as sender
    //TODO: route to fetch the number of rounds associated with current user as recipient with status of 'paid'
    //TODO: clickhandler to direct to round form
    const dispatch = useDispatch();

    // const [ buddyRound, setBuddyRound ] = useState({});
    const [ numRounds, setNumRounds ] = useState({})
    useEffect(() => {
        // const fetchBuddyRound = async () => {
        //     const response = await fetch(`/api/rounds/buddies/recent`)
        //     const round = await response.json()
        //     setBuddyRound(round)
        // }
        const fetchPaidRounds = async () => {
            const response = await fetch('/api/rounds/user/total')
            const roundsToRedeem = await response.json()
            setNumRounds(roundsToRedeem)
        }
        // fetchBuddyRound()
        fetchPaidRounds()
    },[]);

    const roundClickHandler = () => {
    }


    return (
        <div className="Rounds-sidebar">
            {/* <div className="Rounds-sidebar_update">
                {`Your buddy User.username(Round.senderId) recently bought a round for User.username(Round.receiverId)`}
            </div> */}
            <div className="Rounds-sidebar_status">
                {`${numRounds} rounds waiting`}
            </div>
            <button 
                className="button"
                id="button-buy-round"
                onClick={roundClickHandler}
            >
                Next Round's on Me
            </button>
        </div>

    )

}

export default RoundsSidebar;