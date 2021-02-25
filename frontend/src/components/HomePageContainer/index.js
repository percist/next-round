import React from 'react';
import { useSelector } from 'react-redux';
import HomePage from '../HomePage';
import SplashPage from '../SplashPage';


function HomePageContainer({ isLoaded }) {
  const {user} = useSelector(state => state.session);

  const homePageSelector = () => {
  if (user) {
    return (
      <HomePage />
    );
  } else {
    return (
      <SplashPage />
    )
  }
}

  return (
    <>
      {isLoaded && homePageSelector()}
    </>
    )
};

export default HomePageContainer;