import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBuddies } from '../../store/users';
import Buddies from '../Buddies';

const BuddiesSidebar = () => {
  const dispatch = useDispatch();
  const buddies = useSelector(state => state.users);
  const { user } = useSelector(state => state.session);

  useEffect(() => {
    dispatch(fetchAllBuddies(user.id));
  }, [dispatch, user]);

  return (
    <div className="buddies-sidebar-container">
      <div className="buddies-sidebar">
        <div className="buddies-sidebar_header">
          <h2>Buddies</h2>
        </div>
        <div className="buddies-sidebar_feed">
          {(Array.isArray(buddies) && buddies.map(buddy => {
            return <Buddies buddy={buddy} key={buddy.id} />
          }))}
        </div>
      </div>
    </div>
  )
};

export default BuddiesSidebar;