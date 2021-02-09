import React from 'react';
import ItemCard from '../ItemCard';

//TODO: map over items and pass each item to the item card
const ItemCardContainer = ({items}) => {
    console.log("ITEMS:", items)
    return (
        <div className="item-card-container">
            {!Array.isArray(items) && <h2>loading...</h2> }
            {Array.isArray(items) && items.map((item,i) => {
                console.log("item", item)
                if (item) return <ItemCard item={item} key={i}/>
                else return null
            })}
        </div>
        )
}

export default ItemCardContainer;