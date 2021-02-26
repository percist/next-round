import React from 'react';
import MenuItem from '../MenuItem';

const MenuList = ({ itemsToDisplay, setItemsToDisplay, siteId }) => {

  return (
    <div className="comment-feed">
      {Array.isArray(itemsToDisplay) && itemsToDisplay.map(item => {
        return (
          <div className="menu-list-item" key={item.id}>
            <MenuItem
              item={item}
              siteId={siteId}
              itemsToDisplay={itemsToDisplay}
              setItemsToDisplay={setItemsToDisplay}
            />
          </div>
        )
      })}
    </div>
  )
};

export default MenuList;