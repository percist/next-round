import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import MenuItemContainer from '../MenuItemContainer';

const MenuList = SortableContainer(({ itemsToDisplay, setItemsToDisplay, siteId }) => {

  // TODO: currently disapearing on drag. need to implement array-move https://medium.com/nerd-for-tech/drag-and-drop-in-react-with-react-sortable-hoc-516c50acd4d1
  // also possibly implement a button to allow sorting and lock in order (would entail changing order property of items)

  return (
    <div className="comment-feed">
        {Array.isArray(itemsToDisplay) && itemsToDisplay.sort((a,b)=> a.order - b.order).map(item => {
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
});

export default MenuList;