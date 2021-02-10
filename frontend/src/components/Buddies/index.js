import React from 'react';
import "./Buddies.css"


const Buddies = ({ buddy, rounds, sites }) => {
    console.log(buddy.Rounds[0])
    return (
        <div className="buddy">
            {!buddy.imgUrl && "Loading ..."}
            {buddy.imgUrl && <img src={buddy.imgUrl} alt="user"/>}
            <div className='buddy-info'>
                { buddy.Rounds[0] && <><h3>{buddy.username}</h3> {`recently enjoyed a ${buddy.Rounds[0].Items[0].name} at ${buddy.Rounds[0].Items[0].Sites[0].name}`} </>}
            </div>
        </div>
        
    )
}

export default Buddies;