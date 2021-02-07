import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CommentFeed from '../CommentFeed'


const SiteRoundsCard = ({ round, site }) => {
    const dispatch = useDispatch()
    const [item, setItem] = useState({})
    
    useEffect(() => {
        const fetchItem = async (itemId) => {
            const res = await fetch(`/api/rounds/items/${itemId}`)
            const { roundItem } = await res.json()
            return setItem(roundItem)
        }
        fetchItem(round.RoundItems.itemId)
    }, [dispatch, round])

    return (
        <div className="rounds-card" >
            <div className="rounds-card-header">
                <div id="rounds-card-header_site_name">
                    {site && <h2>loading....</h2>}
                    {site && site.name}
                </div>
                <div id="rounds-card-header_site_location">
                    {`${site.city}, ${site.state}`}
                </div>
            </div>
            <div className="round-card-image">
                {!round.imageUrl &&
                    !site.imgUrl &&
                    item.imageUrl &&
                    null
                }
                {!round.imageUrl &&
                    !site.imgUrl &&
                    <img src={item.imageUrl} alt="drink"
                    />}
                {!round.imageUrl &&
                    <img src={site.imgUrl} alt="site"
                    />}
                {round.imageUrl &&
                    <img src={round.imageUrl} alt="round"
                    />}
            </div>
            <div className="round-card-info">
                <div>
                    {`${round.User.username} having a ${item.name}`}
                </div>
                <div>
                    {round.comment}
                </div>
                {/* <div>
                    {!Array.isArray(replies) && "Be the first to comment"}
                    {Array.isArray(replies) && <CommentFeed comments={replies} round={round} user={user}/>}
                </div> */}
            </div>
        </div>
    )
}

export default SiteRoundsCard;