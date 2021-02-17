import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUserRounds } from '../../store/rounds';
import RoundsClaimItem from '../RoundsClaimItem';
import './RoundsClaim.css'

const RoundsClaimForm = () => {

  const dispatch = useDispatch();

  const rounds = useSelector(fullReduxState => {
    return fullReduxState.rounds;
  })

  const { user } = useSelector(reduxState => {
    return reduxState.session;
  });

  const [roundsToDisplay, setRoundsToDisplay] = useState([]);

  useEffect(() => {
    dispatch(fetchAllUserRounds(user.id))
  }, [dispatch, user])

  useEffect(() => {
    if (rounds[0])
      setRoundsToDisplay([...rounds])
  }, [dispatch, rounds])

  return (
    <div className="round-claim-feed">
      <h1>{`${user.username}, you have ${roundsToDisplay.length} rounds ready to redeem`}</h1>
      {Array.isArray(roundsToDisplay) && roundsToDisplay.map(round => {
        return (
          <div className="round-claim-item" >
            <RoundsClaimItem
              round={round}
              key={round.id}
              roundsToDisplay={roundsToDisplay}
              setRoundsToDisplay={setRoundsToDisplay}
            />
          </div>
        )
      })}
    </div>
  )
}

export default RoundsClaimForm;