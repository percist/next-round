import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ItemCardContainer from "../ItemCardContainer";
import RoundsFeed from "../RoundsFeed";
import { fetchAllUserClaimedRounds } from "../../store/rounds";

const UserPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const { buddyId } = params;
  const [ bannerImg, setBannerImg ] = useState(null)
  const user = useSelector((state) => state.session.user)

  const site = useSelector(fullReduxState => {
    return fullReduxState.sites;
  })

  const rounds = useSelector(fullReduxState => {
    return fullReduxState.rounds;
  })

  useEffect(() => {

    dispatch(fetchAllUserClaimedRounds(buddyId))
  }, [dispatch, buddyId]);

  return (
    <div className="buddy-page">
      <div className="buddy-page-header">
        <img src={site.imgUrl} alt={site.name} />
        <h1>{site.name}</h1>
      </div>
      <div className="buddy-page-content">
        <div className="buddy-page-content-feed">
          {/* <ItemCardContainer items={items} /> */}
          <RoundsFeed rounds={rounds} site={site} type="buddy" />
        </div>
      </div>
    </div>
  )
}

export default UserPage;