import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import qrImage from './qr-code.png';
import ItemImage from "../ItemImage";
import { fetchUpdateRoundToClaimed } from '../../store/rounds';
import spinner from  '../../Spinner-1s-44px.gif'

const RoundsClaimRound = ({ round, roundsToDisplay, setRoundsToDisplay }) => {

  const dispatch = useDispatch();

  const [item, setItem] = useState({});
  const [site, setSite] = useState({});
  const [id, setId] = useState('');
  const [sender, setSender] = useState({});
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [wasClaimed, setWasClaimed] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);
  const [errors, setErrors] = useState([]);

  const onCommentSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchUpdateRoundToClaimed(id, comment, image))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    setComment("");
    setImage(null);
    setWasClaimed(true);
    // eslint-disable-next-line eqeqeq
    await setRoundsToDisplay([...roundsToDisplay.filter(setRound => setRound.id != id)])
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  const handleRedeemClick = () => setWasClicked(true)
  const handleNevermindClick = () => setWasClicked(false);

  useEffect(() => {
    const fetchOneUser = async (userId) => {
      const response = await fetch(`/api/users/${userId}`)
      const roundSender = await response.json()
      setSender(roundSender)
    }
    // eslint-disable-next-line eqeqeq
    if (Array.isArray(round.Items) && round.Items[0] != undefined) {
      setId(round.id)
      setItem(round.Items[0]);
      setSite(round.Items[0].Sites[0]);
      fetchOneUser(round.senderId);
    }
  }, [round])

  return (
    <div hidden={wasClaimed} className="rounds-claim-card">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className="rounds-claim-card-info">
        <div id="rounds-claim-card_image">
          <ItemImage image={item.imgUrl} />
        </div>
        <div className="rounds-claim-card-details">
          <div id="rounds-claim-card_info">
            <div id="rounds-claim-card_info_round">
              {!item && !site && <img src={spinner} alt="loading..."/>}
              {item && site &&
                <>
                  <h2>{item.name}</h2>
                  <a href={`/sites/${site.id}`}><h3>at {site.name}</h3></a>
                </>}
            </div>
            <div id="rounds-claim-card_info_sender" >
              <img src={sender.imgUrl}  alt="user" /> {sender.username}
            </div>
          </div>
        <button className="button redeem-button" hidden={wasClicked} onClick={handleRedeemClick} >
          Redeem Now
        </button>
        </div>
      </div>
      <div className="rounds-claim-card_actions">
        <div className="rounds-claim-qr">
          <img hidden={!wasClicked} src={qrImage} alt="qr code" />
        </div>
        <div hidden={!wasClicked} className="rounds-claim-card_comment">
          <form className="comment-form_form" onSubmit={e => onCommentSubmit(e)}>
            <div className="comment-form_form-field">
              <label>
                Write a post:
              </label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="input rounds-cliam-form_input"
              />
            </div>
            <div className="comment-form_form-field">
              <label>
                Add a photo:
                </label>
              <input
                className="input menu-item-form_input"
                type="file"
                onChange={updateFile}
              />
            </div>
            <button type="submit" className="button submit-button">
              Post your Round
                          </button>
          </form>
          <div className="comment-form_buttons">
            <button className="button later-button" hidden={!wasClicked} onClick={handleNevermindClick} >
              Maybe Later
            </button>
          </div>
        </div>
      </div>

    </div>
  )
};

export default RoundsClaimRound;