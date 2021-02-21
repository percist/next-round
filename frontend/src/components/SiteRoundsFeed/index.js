import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRoundItem } from './SiteRoundsFeedUtils';
import RoundsCard from '../RoundsCard';


const SiteRoundsCard = ({ round, site }) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState({});
  const [user, setUser] = useState({});


  useEffect(() => {
    fetchRoundItem(round.id, setItem);
    setUser(round.receiverId);
  }, [dispatch, round]);

  if (!!item) {
    return (
      <RoundsCard
        round={round}
        site={site}
        user={user}
        item={item}
      />
    )
  } else return null;
};

export default SiteRoundsCard;