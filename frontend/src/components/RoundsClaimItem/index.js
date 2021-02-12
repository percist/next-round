import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import image from './qr-code.png';
import ItemImage from "../ItemImage"
import { fetchUpdateRoundToClaimed } from '../../store/rounds'
// import './roundCard.css'

const RoundsClaimRound = ({ round }) => {

    const dispatch = useDispatch();

    const [item, setItem] = useState({});
    const [site, setSite] = useState({});
    const [id, setId ] = useState('')
    const [sender, setSender] = useState({});
    const [comment, setComment] = useState("");
    const [wasClaimed, setWasClaimed] = useState(false)
    const [wasClicked, setWasClicked] = useState(false);

    const onCommentSubmit = (e) => {
        e.preventDefault();
        console.log(id, comment)
        dispatch(fetchUpdateRoundToClaimed(id, comment));
        setComment("");
        setWasClaimed(true);
    }

    const handleRedeemClick = () => {
        setWasClicked(true)
    }

    const handleNevermindClick = () => {
        setWasClicked(false)
    }

    useEffect(() => {
        const fetchOneUser = async (userId) => {
            const response = await fetch(`/api/users/${userId}`)
            const roundSender = await response.json()
            setSender(roundSender)
        }
        if (Array.isArray(round.Items) && round.Items[0] != undefined) {
            setId(round.id)
            setItem(round.Items[0]);
            setSite(round.Items[0].Sites[0]);
            fetchOneUser(round.senderId);
        }
    }, [round])

    return (
        <div hidden={wasClaimed} className="rounds-claim-card">
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
            <div className="rounds-claim-card_buttons">
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
            <div className="rounds-claim-card_comment">
                <form className="comment-form_form" onSubmit={e=>onCommentSubmit(e)}>
                    <textarea value={comment} onChange={e => setComment(e.target.value)} className="input-field" />
                    <button type="submit" className="submit-button">Post your Round</button>
                </form>
            </div>

        </div>
    )
}

export default RoundsClaimRound;