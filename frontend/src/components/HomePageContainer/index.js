import React from 'react';
import { useSelector } from 'react-redux';
import HomePage from '../HomePage';
import SplashPage from '../SplashPage';


function HomePageContainer() {
  const sessionUser = useSelector(state => state.session.user);

  let homePageSelector;
  if (sessionUser) {
    homePageSelector = (
      <HomePage />
    );
  } else {
    homePageSelector = (
      <SplashPage />
    )
  }

  return (
    <>
      {homePageSelector}
    </>
    )
}

export default HomePageContainer;