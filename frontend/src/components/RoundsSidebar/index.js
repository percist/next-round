import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const RoundsSidebar = (user) => {
    const history = useHistory();

    const [ numRounds, setNumRounds ] = useState({});

    useEffect(() => {
        const fetchPaidRounds = async () => {
            const response = await fetch('/api/rounds/user/total')
            const roundsToRedeem = await response.json()
            setNumRounds(roundsToRedeem)
        }
        fetchPaidRounds()
    },[]);

    const roundClickHandler = () => {
        history.push("/users/round");
    }

    return (
        <div className="rounds-sidebar">
            <div className="rounds-sidebar_status">
                {`${numRounds} rounds waiting`}
            <button 
                className="button"
                id="button-redeem-round"
                onClick={roundClickHandler}
            >
                {/* TODO: implement round claiming */}
                Claim a Round
            </button>
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