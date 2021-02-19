import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ItemCardContainer from "../ItemCardContainer";
import UserRoundsFeed from "../UserRoundsFeed";
import { fetchOneUser } from "../../store/users";
import { fetchAllUserClaimedRounds } from "../../store/rounds";
import './UserPage.css'

const UserPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const [bannerImg, setBannerImg] = useState(null)
  const  user  = useSelector((state) => state.users)

  const rounds = useSelector(fullReduxState => {
    return fullReduxState.rounds;
  })

  useEffect(() => {
    dispatch(fetchOneUser(id))
    dispatch(fetchAllUserClaimedRounds(id))
  }, [dispatch, id]);

  return (
    <div id="buddy-page">
      <div className="buddy-page-header">
        <div id="buddy-page-header_banner">
        {!Array.isArray(rounds) && "loading..."}
        {Array.isArray(rounds) && rounds[0] && <img src={rounds[0].imgUrl} alt="a round" />}
          </div>
          <div id="buddy-page-header_profile">
        {!user.imgUrl && "loading..."}
        {user.imgUrl && <img src={user.imgUrl} alt="a round" />}
        </div>
        {!user && "loading..."}
        {user && <h1>{user.firstName} {user.lastName}</h1>}
      </div>
      <div className="buddy-page-content">
        <div className="buddy-page-content-feed">
        {/* <ItemCardContainer items={items} />  */}
        <UserRoundsFeed roundsArray={rounds} />
      </div>
        </div>
  </div>
  )
}

export default UserPage;