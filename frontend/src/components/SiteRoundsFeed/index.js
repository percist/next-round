import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoundsCard from '../RoundsCard';


const SiteRoundsCard = ({ round, site }) => {
    const dispatch = useDispatch()
    const [item, setItem] = useState({})
    const [user, setUser] = useState({})

    
    useEffect(() => {
        const fetchRoundItem = async (roundId) => {
            const res = await fetch(`/api/rounds/rounditems/${roundId}`)
            const { roundItem } = await res.json();
            if (roundItem) return setItem(roundItem.Item)
        }
        fetchRoundItem(round.id)
        setUser(round.User)
    }, [dispatch, round])

    if (!!item){
        return (
            <RoundsCard 
                round={round} 
                site={site} 
                user={user} 
                item={item} 
            />
        )
    }else return null;
}

export default SiteRoundsCard;