import React, { useEffect, useState } from 'react';
import RoundsCard from '../RoundsCard'

const UserRoundsFeed = ({ roundsArray }) => {

  const [sites, setSites] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (Array.isArray(roundsArray[0].Items)) {
      const itemsArray = roundsArray.map((round) => round.Items[0])
      const sitesArray = roundsArray.map((round) => round.Items[0].Sites[0])
      setItems(itemsArray)
      setSites(sitesArray)
    }
  }, [roundsArray])

  return (
    <>
      {!Array.isArray(roundsArray) && <h2>loading...</h2>}
      {Array.isArray(roundsArray) && sites && items && roundsArray.map((round, i) => {
        return (
          <div key={round.id}>
            {!round && "loading..."}
            {round &&
              <RoundsCard
                round={round}
                site={sites[i]}
                user={null}
                item={items[i]}
                type="user"
              />
            }
          </div>
        )
      })}
    </>
  )
}

export default UserRoundsFeed;