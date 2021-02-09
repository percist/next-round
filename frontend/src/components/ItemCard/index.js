import React from 'react';

const ItemCard = (item) => {
    return (
        <div className="item-card">
            <h2>itemCard</h2>
            <div className="item-card_image">
                <img src={item.imgUrl} alt="site item"/>          
            </div>
            <div className="item-card_info">
                {item.name}
                <br />
                {item.description}
            </div>

        </div>
        )
}

export default ItemCard;