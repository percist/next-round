import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoundsCard from '../RoundsCard'

const UserRoundsFeed = ({ roundArray }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const [site, setSite] = useState({})
  const [item, setItem] = useState({})
  const [round, setRound] = useState({})

  useEffect(() => {
    const fetchReceiver = async (userId) => {
      const res = await fetch(`/api/users/${userId}`)
      const user = await res.json()
      return setUser(user)
    }
    if (roundArray[0] != undefined) {
      fetchReceiver(roundArray[0].receiverId)
      setSite(roundArray[0].Items[0].Sites[0])
      setItem(roundArray[0].Items[0])
      setRound(roundArray[0])
    }
  }, [dispatch, roundArray])

  if (roundArray[0] === undefined) return null
  return (
    <RoundsCard 
      round={round} 
      site={site} 
      user={user} 
      item={item} 
    />
  )
}

export default UserRoundsFeed;