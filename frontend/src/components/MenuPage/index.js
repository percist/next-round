import React from 'react';
import { editMenuOrderDispatcher } from "./MenuPageUtils";
import arrayMove from 'array-move';
import MenuList from '../MenuList';
import './MenuPage.css';

const MenuPage = ({site, items, itemsToDisplay, setItemsToDisplay}) => {

  const { siteId } = site.id;

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newItemsToDisplay = arrayMove(
      itemsToDisplay,
      oldIndex,
      newIndex,
    );
    for (let i = 0; i < newItemsToDisplay.length; i++){
      newItemsToDisplay[i].order = i
    }
    const ids = newItemsToDisplay.map(item => item.id)
    editMenuOrderDispatcher(siteId, ids);
    setItemsToDisplay(newItemsToDisplay);
  }

  return (
    <div className="menu">
      <div className="menu-list">

        <MenuList
          itemsToDisplay={itemsToDisplay}
          onSortEnd={onSortEnd}
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