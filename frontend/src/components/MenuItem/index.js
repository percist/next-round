import React from 'react';

const MenuItem = ({ item, siteId }) => {

    const deleteMenuItem = async () => {
        await fetch(`/api/site/${siteId}/items/${item.id}`, {
            method: 'DELETE',
        })
    }

    return (
        <div className="menu-item">
            <h2>{item.name}</h2>
            <div className="menu-item_image">
                {item.imgUrl && <img src={item.imgUrl} alt="site item"/>}          
            </div>
            <div className="menu-item_info">
                {item.description}
            </div>
            <div className="menu-item_price">
                {`$${item.price / 100}`}
            </div>
            <button onClick={deleteMenuItem}>Delete</button>
        </div>
        )
}

export default MenuItem;