import React, { useState, useEffect } from 'react';
import "./Buddies.css"


const Buddies = ({ buddy }) => {
    const [site, setSite] = useState({})
    const [item, setItem] = useState({})
    const [round, setRound] = useState({})

    useEffect(() => {
        if (buddy.Rounds[0] != undefined) {
          setSite(buddy.Rounds[0].Items[0].Sites[0])
          setItem(buddy.Rounds[0].Items[0])
          setRound(buddy.Rounds[0])
        }
      }, [buddy])

    return (
        <div className="buddy">
            {!buddy.imgUrl && "Loading ..."}
            {buddy.imgUrl && <img src={buddy.imgUrl} alt="user"/>}
            <div id='buddy-info'>
                { round && 
                    <>
                        <h3>
                        <a href={`/users/${buddy.id}`} >{buddy.username}</a>
                        </h3> 
                        {`recently enjoyed a ${item.name} at `}<a href={`/sites/${site.id}`} >{site.name}</a>
                        
                    </>
                }
            </div>
        </div>
        
    )
}

export default Buddies;