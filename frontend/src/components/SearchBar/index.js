import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import createSearchResults from '../../store/search';

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState('');

  const handleXClick = (e) => {
    e.preventDefault()
    setQuery("")
  }

  const handleSearch = (e) => {
    e.preventDefault();
    // dispatch(createSearchResults(query))
    const searchSitesAndBuddies = async(query) => {
      const createSearch = async () => {
        const res = await fetch(`/api/users/${query}`);
        if (res.ok) return res.json();
      } ;
      const results = await createSearch()
      setQuery('');
      history.push({
        pathname: `/search/?=${query}`,
        state: results
      });
    };
    searchSitesAndBuddies(query)

    //TODO: refactor to pass in results props based on this link:
    //https://levelup.gitconnected.com/how-to-pass-additional-data-while-redirecting-to-different-route-f7bf5f95d48c
  }

  return (
    <div id="search-bar">
      <input
        id="search-bar"
        maxLength={60}
        value={query}
        placeholder={"Search to find buddies and businesses"}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} id="search-button">
        Search
              </button>
      <button onClick={handleXClick} className="clear-button">
        clear
            </button>
    </div>
  );
}

export default SearchBar;