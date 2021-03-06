import React, { useEffect, useState } from 'react';
import RoundsCard from '../RoundsCard';
import spinner from  '../../Spinner-1s-44px.gif';

const UserRoundsFeed = ({ roundsArray }) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (Array.isArray(roundsArray) && roundsArray[0] && Array.isArray(roundsArray[0].Items)) {
      const itemsArray = roundsArray.map((round) => round.Items[0]);
      setItems(itemsArray);
    }
  }, [roundsArray]);

  return (
    <div>
      {!Array.isArray(roundsArray) && <img src={spinner} alt="loading..."/>}
      {Array.isArray(roundsArray) && items && roundsArray.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).map((round, i) => {
        return (
          <div key={round.id}>
            {(!round || !Array.isArray(round.Items) ||!round.Items[0]) && <img src={spinner} alt="loading..."/>}
            {round && Array.isArray(round.Items) && round.Items[0] &&
              <RoundsCard
                round={round}
                site={round.Items[0].Sites[0]}
                user={null}
                item={items[i]}
                type="user"
              />
            }
          </div>
        );
      })}
    </div>
  );
};

export default UserRoundsFeed;