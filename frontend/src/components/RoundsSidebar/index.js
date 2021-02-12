import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const RoundsSidebar = () => {
    const history = useHistory();

    const {user} =  useSelector(reduxState => {
        return reduxState.session;
    });

    const [ numRounds, setNumRounds ] = useState({});
    useEffect(() => {
        const fetchPaidRounds = async () => {
            const response = await fetch('/api/rounds/user/total')
            const roundsToRedeem = await response.json()
            setNumRounds(roundsToRedeem)
        }
        fetchPaidRounds()
    },[]);
    
    const redeemRoundClickHandler = () => {
        history.push(`/users/${user.id}/round`);
    }

    const buyRoundClickHandler = () => {
        history.push("/users/round");
    }

    return (
        <div className="rounds-sidebar">
                {`${numRounds} rounds waiting`}
            <button 
                className="button"
                id="button-redeem-round"
                onClick={redeemRoundClickHandler}
            >
                {/* TODO: implement round claiming */}
                Claim a Round
            </button>
            <button 
                className="button"
                id="button-buy-round"
                onClick={buyRoundClickHandler}
            >
                Send a Round
            </button>
        </div>

    )

}

export default RoundsSidebar;