import React, { useEffect, useState } from 'react';
import {timeDifference} from '../../dateUtilities'

const RoundsCard = ({ user, site, item, round, type }) => {
  const [receiver, setReceiver] = useState([])

  useEffect(() => {
    const receiverFetchFunction = async () => {
      if (type == "user") {
        const fetchReceiver = async (userId) => {
          const res = await fetch(`/api/users/${userId}`)
          const user = await res.json()
          return user
        }
        const thisUser = await fetchReceiver(round.receiverId)
        await setReceiver(thisUser)
      }
    }
    receiverFetchFunction()
  }, [type, round])

  if (type == "user") user = receiver

  if (user === undefined || site === undefined || item === undefined || round === undefined) return null

  return (
    <div className="rounds-card" >
      <div className="rounds-card-header">
        <div id="rounds-card-header_image">
          <a href={`/users/${user.id}`} >
            {!user.imgUrl && "Loading ..."}
            {user.imgUrl && <img src={user.imgUrl} alt="user" />}
          </a>
        </div>
        <div className="rounds-card-header-description">
          <div id="rounds-card-header_name">
            {user.username}
          </div>
          <div id="rounds-card-header_time">
            {timeDifference(round.createdAt)}
          </div>
        </div>
      </div>
        <div id="rounds-card-header_comment">
          {round.comment}
        </div>
      <div className="rounds-card-image">
        {!round.imgUrl &&
          !site.imgUrl &&
          "Loading ..."
        }
        {round.imgUrl &&
          <img src={round.imgUrl} alt="round"
          />}
        {!round.imgUrl &&
          site.imgUrl &&
          <img src={site.imgUrl} alt="site"
          />}
      </div>
      <div className="rounds-card-info">
        <div id="rounds-card-info_site_name">
          {!site && <h2>loading....</h2>}
          {site &&
            <a href={`/sites/${site.id}`} >
              {site.name}
            </a>}
        </div>
        <div id="rounds-card-info_site_item">
         {!item && <h2>loading....</h2>}
          {item && `${item.name}`}
        </div>
        <div id="rounds-card-info_site_location">
          {!site && <h2>loading....</h2>}
          {site && `${site.city}, ${site.state}`}
        </div>
      </div>
        <hr id="rounds-card-info_divider" color='silver'/>
    </div>
  )
};

export default RoundsCard;