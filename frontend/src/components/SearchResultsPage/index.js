import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import SearchResult from '../SearchResult';
import { fetchAllBuddies } from '../../store/users'
import './SearchResultsPage.css'

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {user} = useSelector(state => state.session);
  const buddies = useSelector((state) => state.users);
  const [ resultsToDisplay, setResultsToDisplay ] = useState([])
  const [ buddyIds, setBuddyIds ] = useState([]);

  useEffect(()=> {
    setResultsToDisplay([...location.state.results])
  },[location])

  useEffect(() => {
    dispatch(fetchAllBuddies(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    if(Array.isArray(buddies)){
      setBuddyIds([...buddies.map(buddy=>buddy.id)]);
    }
  }, [buddies]);

  return (
    <div id="search-results-page">
      <div id="search-results-page-sidebar">
        <h2>Search Results for</h2>
        {location.state.query}
        <hr/>
        <div id="search-results-page-sidebar_filters">
          <h3>Filters</h3>
          <button>All</button>
          <button>People</button>
          <button>Businesses</button>
        </div>
      </div>
      <div id="search-results-page-feed">
        {!resultsToDisplay && "no results to display"}
        {resultsToDisplay && resultsToDisplay.map((result, i) => {
          if(result.username){
            const buddy = buddyIds.includes(result.id)
            return (<SearchResult type={"user"} buddy={buddy} result={result} key={i}/>)
          }else{
            return (<SearchResult type={"site"} result={result} key={i}/>)
          }
        })}
      </div>
    </div>
  )
}

export default SearchResultsPage;