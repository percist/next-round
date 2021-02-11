import React from 'react';
import { FaGlassCheers } from "react-icons/fa"

const ItemCard = ({item}) => {
    return (
        <div className="item-card">
            {/* <h2>{item.name}</h2>
            <div className="item-card_image">
                {item.imgUrl && <img src={item.imgUrl} alt="site item"/>}          
            </div>
            <div className="item-card_info">
                {item.description}
            </div> */}
                <img src={item.imgUrl} alt="item"/>
                {item.name}
        </div>
        )
}

export default ItemCard;