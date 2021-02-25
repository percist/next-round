import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserRoundsFeed from "../UserRoundsFeed";
import UserImage from "../UserImage";
import { fetchOneUser } from "../../store/users";
import { fetchAllUserClaimedRounds } from "../../store/rounds";
import { followSwitch, fetchIfBuddies } from "./UserPageUtils";
import UnfollowButton from "../UnfollowButton";
import spinner from '../../Spinner-1s-44px.gif';
import './UserPage.css';

const UserPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const sessionUser = useSelector(state => state.session.user)
  const user = useSelector((state) => state.users);
  const rounds = useSelector(state => state.rounds);
  const [isBuddy, setIsBuddy] = useState(false);

  useEffect(() => {
    dispatch(fetchOneUser(id));
    dispatch(fetchAllUserClaimedRounds(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchIfBuddies(sessionUser.id, id, setIsBuddy)
  },[sessionUser, id])

  const unfollowSwitch = () => {
    if (isBuddy) {
      return <UnfollowButton userId={sessionUser.id} buddyId={id} setIsBuddy={setIsBuddy} />
    }
  }

  return (
    <div id="buddy-page">
      <div className="buddy-page-header">
        <div id="buddy-page-header_banner">
          {!Array.isArray(rounds) && <img src={spinner} alt="loading..." />}
          {Array.isArray(rounds) && rounds[0] && <img src={rounds[0].imgUrl} alt="a round" />}
        </div>
        <div id="buddy-page-header_profile">
          <UserImage user={user} />
        </div>
        <div id="buddy-page-header_name">
          {!user && <img src={spinner} alt="loading..." />}
          {user && <h1>{user.firstName} {user.lastName}  </h1>}
          {followSwitch(isBuddy, setIsBuddy, id, sessionUser.id)}
          <div id="buddy-page-header_name-follow">
            {unfollowSwitch()}
          </div>
        </div>
      </div>
      <div className="buddy-page-content">
        <div className="buddy-page-content-feed">
          <UserRoundsFeed roundsArray={rounds} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;