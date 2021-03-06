import React, { useEffect, useState } from 'react';
import ItemCard from '../ItemCard';
import "./ItemCardContainer.css";
import spinner from  '../../Spinner-1s-44px.gif'

const ItemCardContainer = ({ items }) => {

  const [overflowItemsShown, setOverflowItemsShown] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [hideButton, setHideButton] = useState(true);

  const handleShowClick = (e) => {
    e.preventDefault();
    setHideButton(false);
    setShowButton(true);
    setOverflowItemsShown(true);
  }
  const handleHideClick = (e) => {
    e.preventDefault();
    setHideButton(true);
    setShowButton(false);
    setOverflowItemsShown(false);
  }

  useEffect(() => {
    if (Array.isArray(items) && items.length > 5) {
      setShowButton(false);
    }
  }, [items]);

  const overflow = () => {
    if (!!overflowItemsShown) {
      return (
        <div>
          {!Array.isArray(items) && <img src={spinner} alt="loading..."/>}
          {Array.isArray(items) && items.filter(item=> item.isActive).slice(5).map(item => {
            if (item) {
              return <ItemCard item={item} key={item.name} />
            } else return null
          })}
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className="item-card-container">
      <div id="item-card-container_initial">
        {!Array.isArray(items) && <img src={spinner} alt="loading..."/>}
        {Array.isArray(items) && items.slice(0, 5).map((item, i) => {
          if (item) return <ItemCard item={item} key={i} />
          else return null
        })}
      </div>
      <button 
        className="button show-items-button" 
        aria-label="show items button" 
        hidden={showButton} 
        onClick={handleShowClick}
        >
        Show All Items
            </button>
      <div id="item-card-container_additional">
        {overflow()}
      </div>
      <button 
        className="button hide-items-button" 
        aria-label="hide items button" 
        hidden={hideButton} 
        onClick={handleHideClick}
        >
        Hide Items
            </button>
    </div>
  )
};

export default ItemCardContainer;