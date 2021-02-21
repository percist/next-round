import React from 'react';
import ItemImage from '../ItemImage';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <div id="item-card_image">
        <ItemImage image={item.imgUrl} />
      </div>
      <div id="item-card_name">
        {item.name}
      </div>
    </div>
  )
};

export default ItemCard;