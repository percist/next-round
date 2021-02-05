import React from 'react';
import ItemCard from '../ItemCard';

//TODO: map over items and pass each item to the item card
const ItemCardContainer = ({items}) => {
    let item = items;
    return (
        <div className="item-card-container">
            ItemCardContainer
            <ItemCard item={item}/>
        </div>
        )
}

export default ItemCardContainer;