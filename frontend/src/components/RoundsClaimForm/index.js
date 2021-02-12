import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUserRounds } from '../../store/rounds';
import RoundsClaimItem from '../RoundsClaimItem';

const RoundsClaimForm = () => {
    const dispatch = useDispatch();
    // const [ roundsToDisplay, setRoundsToDisplay ] = useState([]);
    const [ selectedRound, setSelectedRound ] = useState({});
    const [ processed, setProcessed ] = useState(false);

    const rounds = useSelector(fullReduxState => {
        return fullReduxState.rounds;
    })

    const {user} =  useSelector(reduxState => {
        return reduxState.session;
    });    
    
    useEffect(() => {
        dispatch(fetchAllUserRounds(user.id))
    },[dispatch, user])

    const buyRoundClickHandler = (e) => {
        setSelectedRound(e.target.value)
    }
    
    return (
        <div className="round-claim-feed">
        {Array.isArray(rounds) && rounds.map(round => {
        return (
        <div className="round-claim-item">
            <RoundsClaimItem 
                round={round} 
                key={round.id} 
            />
        </div>
        )})}
</div>
    )
}

export default RoundsClaimForm;