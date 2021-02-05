import React from 'react';

const ItemCard = ({item}) => {
    return (
        <div className="item-card">
            <h2>itemCard</h2>
            <div className="item-card_image">
                item image_url            
            </div>
            <div className="item-card_info">
                item info
            </div>

        </div>
        )
}

export default ItemCard;