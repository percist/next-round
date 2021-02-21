import React, { useEffect } from 'react';
import RoundsFeed from '../RoundsFeed';
import RoundsSidebar from '../RoundsSidebar';
import BuddiesSidebar from '../BuddiesSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBuddyRounds } from '../../store/rounds';
import "./HomePage.css";

const HomePage = ({user}) => {

  const dispatch = useDispatch();
  const rounds = useSelector(state => state.rounds);

  useEffect(() => {
    dispatch(fetchAllBuddyRounds(user.id));
  }, [dispatch, user]);

  return (
    <div className="user-page-container">
      <div className="user-page">
        <div className="user-page-rounds_sidebar">
          <RoundsSidebar />
        </div>
        <div className="user-page-site_feed">
          <RoundsFeed rounds={rounds} type="users" />
        </div>
        <div className="user-page-buddies_sidebar">
          <BuddiesSidebar />
        </div>
      </div>
    </div>
  )
};

export default HomePage;