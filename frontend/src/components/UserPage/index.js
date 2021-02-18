import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ItemCardContainer from "../ItemCardContainer";
import UserRoundsFeed from "../UserRoundsFeed";
import { fetchOneUser } from "../../store/users";
import { fetchAllUserClaimedRounds } from "../../store/rounds";

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
        {!Array.isArray(rounds) && "loading..."}
        {Array.isArray(rounds) && <img src={rounds[0].imgUrl} alt="a round" />}
        {!user && "loading..."}
        {user && <h1>{user.username}</h1>}
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