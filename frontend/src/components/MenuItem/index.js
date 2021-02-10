import React from 'react';
import './MenuItem.css'

const MenuItem = ({ item, siteId }) => {

    const deleteMenuItem = async () => {
        await fetch(`/api/site/${siteId}/items/${item.id}`, {
            method: 'DELETE',
        })
    }

    return (
        <div className="menu-item">
            <div className="menu-item_image">
                {item.imgUrl && <img src={item.imgUrl} alt="site item"/>}          
            </div>
            <h2>Name: {item.name}</h2>
            <div className="menu-item_info">
                Description: {item.description}
            </div>
            <div className="menu-item_price">
                Price: {`$${item.price / 100}`}
            </div>
            <button onClick={deleteMenuItem}>Delete</button>
        </div>
        )
}

export default MenuItem;