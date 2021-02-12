import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ItemImage from "../ItemImage"
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
    },[])

    return (
        <div className="rounds-claim-card">
            <div id="rounds-claim-card_image">
                <ItemImage image={item.imgUrl} />
            </div>
            <div id="rounds-claim-card_info">
                <div id="rounds-claim-card_info_round">
                    Redeem a {item.name} at {site.name}
                </div>
                <div id="rounds-claim-card_info_sender">
                    Sent by {sender.username}
                </div>
            </div>
        </div>
        )
}

export default RoundsClaimRound;