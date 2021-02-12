import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import './roundCard.css'

const RoundsClaimRound = ({round}) => {

    const dispatch = useDispatch();

    const [ item, setItem ] = useState({});
    const [ site, setSite ] = useState({});
    const [ sender, setSender ] = useState({});

    useEffect (() => {
        const fetchOneUser = async(userId) => {
            const response = await fetch(`/api/users/${userId}`)
            const roundSender = await response.json()
            setSender(roundSender)
        }
        if (round.Items[0] != undefined){
            setItem(round.Items[0]);
            setSite(round.Items[0].Sites[0]);
            fetchOneUser(round.senderId);
        }
    },[round])

    return (
        <div className="rounds-claim-card">
            <div id="rounds-claim-card_image">
                {!round.Items[0].imgUrl && <img src="https://img.icons8.com/fluent/96/000000/beer-glass.png"/>}
                {round.Items[0].imgUrl && <img src={round.Items[0].imgUrl} alt={round.name}/>}
            </div>
            <div id="rounds-claim-card_info">
                <div id="rounds-claim-card_info_round">
                    Redeem a {round.Items[0].name} at {round.Items[0].Sites[0].name}
                </div>
                <div id="rounds-claim-card_info_sender">
                    Sent by {sender.username}
                </div>
            </div>
        </div>
        )
}

export default RoundsClaimRound;