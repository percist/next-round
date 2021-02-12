import React from 'react';
import { FaGlassCheers } from "react-icons/fa"
import './ItemCard.css'

const ItemCard = ({item}) => {
    return (
        <div className="item-card">
            <div id="item-card_image">
                {!item.imgUrl && <img src="https://img.icons8.com/fluent/96/000000/beer-glass.png"/>}
                {item.imgUrl && <img src={item.imgUrl} alt={item.name}/>}
            </div>
            {/* <h2>{item.name}</h2>
            <div className="item-card_image">
                {item.imgUrl && <img src={item.imgUrl} alt="site item"/>}          
            </div>
            <div className="item-card_info">
                {item.description}
            </div> */}
            <div id="item-card_name">
                {item.name}
            </div>
        </div>
        )
}

export default ItemCard;