import React from 'react';
import MenuItemContainer from '../MenuItemContainer';
// TODO: implement react-sortable-hoc documentation: https://www.npmjs.com/package/react-sortable-hoc
const MenuList = ({ itemsToDisplay, setItemsToDisplay, siteId }) => {

  return (
    <div className="comment-feed">
        {Array.isArray(itemsToDisplay) && itemsToDisplay.map(item => {
          return (
            <div className="menu-list-item" key={item.id}>
              <MenuItemContainer
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