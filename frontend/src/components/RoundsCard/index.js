import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CommentFeed from '../CommentFeed'


const RoundsCard = ({ round }) => {
  const dispatch = useDispatch()
  const [ user, setUser ] = useState({})

  useEffect(() => {
    const fetchReceiver = async (userId) => {
      const res = await fetch(`/api/users/${userId}`)
      const user = await res.json()
      return setUser(user)
    }
    if (round[0] != undefined){
      fetchReceiver(round[0].receiverId)
    }
  },[dispatch, round])

  if (round[0] === undefined)return null
  return (
        <div className="rounds-card">
            <div className="rounds-card-header">
                <div id="rounds-card-header_site_name">
                  {!round && <h2>loading....</h2>}
                  {round && round[0].Items[0].Sites[0].name}
                </div>
                <div id="rounds-card-header_site_location">
                    {`${round[0].Items[0].Sites[0].city}, ${round[0].Items[0].Sites[0].state}`}
                </div>
            </div>
            <div className="round-card-image">
                {!round[0].imageUrl && 
                  !round[0].Items[0].Sites[0].imgUrl && 
                  round[0].Items[0].imageUrl && 
                  null
                }
                {!round[0].imageUrl && 
                  !round[0].Items[0].Sites[0].imgUrl && 
                  <img src={round[0].Items[0].imageUrl} alt="drink"
                />}
                {!round[0].imageUrl && 
                  <img src={round[0].Items[0].Sites[0].imgUrl} alt="site"
                />}
                {round[0].imageUrl && 
                  <img src={round[0].imageUrl} alt="round"
                />}
            </div>
            <div className="round-card-info">
                <div>
                    {`${user.username} having a ${round[0].Items[0].name}`}
                </div>
                <div>
                    {round[0].comment}
                </div>
                {/* <div>
                    {!Array.isArray(replies) && "Be the first to comment"}
                    {Array.isArray(replies) && <CommentFeed comments={replies} round={round} user={user}/>}
                </div> */}
            </div>
        </div>
    )
}

export default RoundsCard;