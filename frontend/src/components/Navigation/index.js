import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import image from "./NextRoundText.png";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink
          id="link-sites"
          to="/sites"
        >
          Find a Drink
        </NavLink>
        <NavLink
          id="link-my-rounds"
          to={`/users/${sessionUser.id}`} exact
        >
          My Rounds
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = null
  }

  return (
    <>
      <ul className='navbar'>
        <li>
            <img src={image} alt="Next Round's on Me"/>
        </li>
        <li>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </>
  );
}

export default Navigation;