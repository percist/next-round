import React, { useEffect } from 'react';
import { editMenuOrderDispatcher } from "./MenuPageUtils";
import arrayMove from 'array-move';
import MenuList from '../MenuList';
import './MenuPage.css';

const MenuPage = ({site, items, itemsToDisplay, setItemsToDisplay}) => {

  const { siteId } = site.id;

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newItems = arrayMove(
      itemsToDisplay,
      oldIndex,
      newIndex,
    );
    for (let i = 0; i < newItems.length; i++){
      newItems[i].order = i
    }
    const ids = newItems.map(item => item.id)
    editMenuOrderDispatcher(siteId, ids);
    setItemsToDisplay(newItems);
  }

  return (
    <div className="menu">
      <div className="menu-list">

        <MenuList
          items={items}
          itemsToDisplay={itemsToDisplay}
          setItemsToDisplay={setItemsToDisplay}
          siteId={siteId}
          onSortEnd={onSortEnd}
          axis='y'
        />
      </div>
      
    </div>
  )
};

export default MenuPage;