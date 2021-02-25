import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SitePage from "./components/SitePage";
import MenuPage from "./components/MenuPage";
import RoundsSendForm from "./components/RoundsSendForm";
import RoundsClaimForm from "./components/RoundsClaimForm";
import HomePageContainer from "./components/HomePageContainer";
import UserPage from "./components/UserPage";
import SearchResultsPage from "./components/SearchResultsPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/" exact>
            <HomePageContainer isLoaded={isLoaded}/>
          </Route>
          <Route path="/users/round" exact>
            <RoundsSendForm />
          </Route>
          <Route path="/users/:id/round" exact>
            <RoundsClaimForm />
          </Route>
          <Route path="/users/:id" exact >
            <UserPage />
          </Route>
          <Route path="/sites/:siteId" exact >
            <SitePage isLoaded={isLoaded}/>
          </Route>
          <Route path="/sites/:siteId/menu" exact >
            <MenuPage />
          </Route>
          <Route path="/search" exact >
            <SearchResultsPage />
          </Route>
          <Route path="*" >
            <NotFoundPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
