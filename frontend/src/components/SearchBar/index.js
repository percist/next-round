import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch, MdClear } from 'react-icons/all';

const SearchBar = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [errors, setErrors] = useState([]);

  const handleXClick = (e) => {
    e.preventDefault()
    setQuery("")
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setErrors([]);
    const searchSitesAndBuddies = async (query) => {
      const createSearch = async () => {
        const res = await fetch(`/api/users/${query}`);
        if (res.ok) return res.json();
        if (res.data && res.data.errors) setErrors(res.data.errors);
      };
      const results = await createSearch();
      setQuery('');
      history.push({
        pathname: `/search`,
        state: { results, query, errors }
      });
    };
    if (query.length > 0) searchSitesAndBuddies(query);
  }

  return (
    <div id="search-bar">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>)
        )}
      </ul>
      <input
        id="search-bar-input"
        className="input"
        aria-label="search for items, sites, or people"
        maxLength={60}
        value={query}
        placeholder={errors.length > 0 ? errors[0] : "Search"}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        onClick={handleSearch} 
        id="search-button"
        aria-label="search button">
        <FaSearch className="search-icon" />
      </button>
      <button 
        onClick={handleXClick} 
        id="clear-button"
        aria-label="clear search terms"
        >
        <MdClear className="search-icon" />
      </button>
    </div>
  );
}

export default SearchBar;