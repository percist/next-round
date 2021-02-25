import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import SearchResult from '../SearchResult';
import { ImFilesEmpty, IoPersonCircleOutline, IoStorefront } from 'react-icons/all';
import { fetchAllBuddies } from '../../store/users'
import './SearchResultsPage.css'

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector(state => state.session);
  const buddies = useSelector((state) => state.users);
  const [resultsToDisplay, setResultsToDisplay] = useState([])
  const [filter, setFilter] = useState("all");
  const [buddyIds, setBuddyIds] = useState([]);

  useEffect(() => {
    setResultsToDisplay([...location.state.results])
  }, [location])

  useEffect(() => {
    dispatch(fetchAllBuddies(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (Array.isArray(buddies)) {
      setBuddyIds([...buddies.map(buddy => buddy.id)]);
    }
  }, [buddies]);

  const resultsFilter = () => {
    return (
      <>
        {!resultsToDisplay && "no results to display"}
        {resultsToDisplay && buddyIds && filter === "all" && resultsToDisplay.map((result, i) => {
            if (result.username) {
              const buddy = buddyIds.includes(result.id)
              return (<SearchResult type={"user"} buddy={buddy} result={result} key={i} />)
            } else {
              return (<SearchResult type={"site"} result={result} key={i} />)
            }
          })}
        {resultsToDisplay && buddyIds && filter === "sites" && resultsToDisplay.map((result, i) => {
            if (!result.username) {
              return (<SearchResult type={"site"} result={result} key={i} />)
            }
          })}
        {resultsToDisplay && buddyIds && filter === "users" && resultsToDisplay.map((result, i) => {
            if (result.username) {
              const buddy = buddyIds.includes(result.id)
              return (<SearchResult type={"user"} buddy={buddy} result={result} key={i} />)
            } 
          })}
      </>
    )
  }

return (
  <div id="search-results-page">
    <div id="search-results-page-sidebar">
      <h2>Search Results for</h2>
      {location.state.query}
      <hr />
      <div id="search-results-page-sidebar_filters">
        <h3>Filters</h3>
        <div onClick={() => setFilter("all")} id="search-results-page-sidebar_filters-all">
          <ImFilesEmpty className="following-icon" />
          <button>All</button>
        </div>
        <div onClick={() => setFilter("users")} id="search-results-page-sidebar_filters-people">
          <IoPersonCircleOutline className="following-icon" />
          <button>People</button>
        </div>
        <div onClick={() => setFilter("sites")} id="search-results-page-sidebar_filters-sites">
          <IoStorefront className="following-icon" />
          <button>Businesses</button>
        </div>
      </div>
    </div>
    <div id="search-results-page-feed">
      {resultsFilter()}
    </div>
  </div>
)
}

export default SearchResultsPage;