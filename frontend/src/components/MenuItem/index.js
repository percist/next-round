import React from 'react';

const MenuItem = ({ item }) => {

  return (
    <div className="menu-item">
      <div className="menu-item_image">
        <div className="menu-item_image-image">
          {item.imgUrl && <img src={item.imgUrl} alt="site item" />}
        </div>
        <div className="menu-item_image-is_active">
          {item.isActive}
        </div>
      </div>
      <div className="menu-item_info">
        <div className="menu-item_info_title">
          <h2>{item.name}</h2>
        </div>

        <div className="menu-item_info_description">
          {item.description}
        </div>
        <div className="menu-item_info_price">
          Price: {`$${item.price / 100}`}
        </div>
      </div>
    </div>
  )
};

export default MenuItem;