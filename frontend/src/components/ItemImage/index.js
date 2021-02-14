import React from 'react';
import './ItemImage.css'

const ItemImage = ({ image }) => {
    return (
        <div className="item-image">
            {!image && <img src="https://img.icons8.com/fluent/96/000000/beer-glass.png" alt="beer"/>}
            {image && <img src={image} alt="item"/>}
        </div>
    )
}

export default ItemImage;