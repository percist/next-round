import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import UserImage from '../UserImage';
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => setShowMenu(false);

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <div id="profile-button-container">
      <h3>{user.username}</h3>
      <button 
        id="profile-button" 
        label="show profile"
        onClick={openMenu}
        >
        <UserImage type="profile" user={user} />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <div id="link-logout" onClick={logout}>Log Out</div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
