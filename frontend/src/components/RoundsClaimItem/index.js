import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import image from './qr-code.png';
import ItemImage from "../ItemImage"
// import './roundCard.css'

const RoundsClaimRound = ({round}) => {

    const dispatch = useDispatch();

    const [ item, setItem ] = useState({});
    const [ site, setSite ] = useState({});
    const [ sender, setSender ] = useState({});
    const [ wasClicked, setWasClicked ] = useState(false);

    const handleRedeemClick = () => {
        setWasClicked(true)
    }

    const handleNevermindClick = () => {
        setWasClicked(false)
    }

    useEffect (() => {
        const fetchOneUser = async(userId) => {
            const response = await fetch(`/api/users/${userId}`)
            const roundSender = await response.json()
            setSender(roundSender)
        }
        if (Array.isArray(round.Items) && round.Items[0] != undefined){
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
                <div class="rounds-claim-card_buttons">
                   <button hidden={wasClicked} onClick={handleRedeemClick} >
                        Redeem Now
                    </button>
                   <button hidden={!wasClicked} onClick={handleNevermindClick} >
                        Maybe Later
                    </button>
                    <div className="rounds-claim-qr">
                        <img hidden={!wasClicked} src={image} alt="qr code" />
                    </div> 
                </div>
                
            </div>
        </div>
        )
}

export default RoundsClaimRound;