import React from 'react';

const RoundsCard = ({ user, site, item, round }) => {

    return (
        <div className="rounds-card" >
            <div className="rounds-card-header">
                <div id="rounds-card-header_site_name">
                    <a href={`/sites/${site.id}`} >
                        {!site && <h2>loading....</h2>}
                        {site && site.name}
                    </a>
                </div>
                <div id="rounds-card-header_site_location">
                    {`${site.city}, ${site.state}`}
                </div>
            </div>
            <div className="rounds-card-image">
                {!round.imgUrl &&
                    !site.imgUrl &&
                    !item.imgUrl &&
                    // TODO: Insert Icon here
                    "Loading ..."
                }
                {!round.imgUrl &&
                    !site.imgUrl &&
                    item.imgUrl &&
                    <img src={item.imgUrl} alt="drink"
                    />}
                {!round.imgUrl &&
                    site.imgUrl &&
                    <img src={site.imgUrl} alt="site"
                    />}
                {round.imgUrl &&
                    <img src={round.imgUrl} alt="round"
                    />}
            </div>
            <div className="rounds-card-info">
                <div id="rounds-card-info_image">
                    <a href={`/users/${user.id}`} >
                        {!user.imgUrl && "Loading ..."}
                        {user.imgUrl && <img src={user.imgUrl} alt="user" />}
                    </a>
                </div>
                <div className="rounds-card-info-description">
                    <div id="rounds-card-info_name">
                        {user.username}
                    </div>
                    <div id="rounds-card-info_caption">
                        {`having a ${item.name}`}
                    </div>
                    <br color="#FFFFF" />
                    <div id="rounds-card-info_comment">
                        {round.comment}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RoundsCard;