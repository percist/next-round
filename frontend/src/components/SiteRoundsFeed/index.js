import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoundsCard from '../RoundsCard';


const SiteRoundsCard = ({ round, site }) => {
    const dispatch = useDispatch()
    const [item, setItem] = useState({})
    const [user, setUser] = useState({})

    
    useEffect(() => {
        const fetchItem = async (itemId) => {
            const res = await fetch(`/api/rounds/items/${itemId}`)
            const { roundItem } = await res.json()
            return setItem(roundItem)
        }
        fetchItem(round.RoundItems.itemId)
        setUser(round.User)
    }, [dispatch, round])

    return (
        <RoundsCard 
            round={round} 
            site={site} 
            user={user} 
            item={item} 
        />
    )
}

export default SiteRoundsCard;