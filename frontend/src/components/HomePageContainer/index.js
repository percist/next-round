import React from 'react';
import { useSelector } from 'react-redux';
import HomePage from '../HomePage';
import SplashPage from '../SplashPage';


function HomePageContainer() {
  const user = useSelector(state => state.session.user);

  let homePageSelector;
  if (user) {
    homePageSelector = (
      <HomePage user={user}/>
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
};

export default HomePageContainer;