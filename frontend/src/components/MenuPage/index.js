import React, { useEffect, useRef } from 'react';
import { editMenuOrderDispatcher } from "./MenuPageUtils";
import arrayMove from 'array-move';
import MenuList from '../MenuList';
import './MenuPage.css';

const MenuPage = ({site, itemsToDisplay, setItemsToDisplay}) => {

  const siteId = useRef(site.id)

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
    editMenuOrderDispatcher(siteId.current, ids);
    setItemsToDisplay(newItems);
  }

  return (
    <div className="menu">
      <div className="menu-list">
        <h2 id="menu-list_instructions"> Drag and drop menu items to reorder on your page </h2>
        <MenuList
          itemsToDisplay={itemsToDisplay}
          setItemsToDisplay={setItemsToDisplay}
          siteId={siteId.current}
          onSortEnd={onSortEnd}
          axis='y'
        />
      </div>
      
    </div>
  )
};

export default MenuPage;