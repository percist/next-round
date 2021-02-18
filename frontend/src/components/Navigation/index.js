import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {AiFillHome} from 'react-icons/all'
import ProfileButton from './ProfileButton';
import image from "./NextRoundText.png";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (sessionUser) setUserId(sessionUser.id)
    if (!sessionUser) return <Redirect to={`/`} />;
  }, [sessionUser])


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div id="session-links">
        <ProfileButton user={sessionUser} />
        <a id="session-links_home-container" href={`/`}>
          <AiFillHome
            id="session-links_home"
          />
        </a>
      </div>
    );
  } else {
    sessionLinks = null;

  }

  return (
    <>
      <ul className='navbar'>
        <li>
          <img src={image} alt="Next Round's on Me" />
        </li>
        <li>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </>
  );
}

export default Navigation;