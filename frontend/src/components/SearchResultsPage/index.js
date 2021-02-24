import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SearchResult from '../SearchResult';

const SearchResultsPage = () => {
  const params = useParams();
  const location = useLocation();
  const { query } = params;
  const [ resultsToDisplay, setResultsToDisplay ] = useState([])

  useEffect(()=> {
    setResultsToDisplay([...location.state])
  },[location])

  return (
    <div id="search-results-page">
      <h1>Search Results</h1>
      your search for "{query}" returned {resultsToDisplay.length} matches
      {!resultsToDisplay && "no results to display"}
      {resultsToDisplay && resultsToDisplay.map(result => {
        return (<SearchResult type={result.username? "user" : "site"} result={result}/>)
      })}
    </div>
  )
}

export default SearchResultsPage;