import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { IoPersonCircleOutline } from 'react-icons/io5';
import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button id="profile-button" onClick={openMenu}>
        {!user && <IoPersonCircleOutline />}
        {!user.imgUrl && <IoPersonCircleOutline />}
        {user.imgUrl && <img id="navbar-link_user_image" src={user.imgUrl} alt="Me"/>}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="profile-dropdown_1">{user.username}</li>
          <li className="profile-dropdown_2">{user.email}</li>
          <li>
            <div id="link-logout" onClick={logout}>Log Out</div>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
