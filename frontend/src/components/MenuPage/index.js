import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllSiteItems } from '../../store/items'
import { fetchOneSite } from '../../store/sites';
import arrayMove from 'array-move';
import MenuList from '../MenuList';
import './MenuPage.css';

const MenuPage = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const { siteId } = params;
  const items = useSelector(state => state.items);

  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  useEffect(() => {
    dispatch(fetchAllSiteItems(siteId));
    dispatch(fetchOneSite(siteId));
  }, [dispatch, siteId]);

  useEffect(() => {
    if (items[0])
      setItemsToDisplay([...items.sort((a,b)=> a.order < b.order)]);
  }, [items]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newItemsToDisplay = arrayMove(
      itemsToDisplay,
      oldIndex,
      newIndex,
    );
    for (let i = 0; i < newItemsToDisplay.length; i++){
      newItemsToDisplay[i].order = i
    }
    setItemsToDisplay(newItemsToDisplay);
  }

  return (
    <div className="menu">
      <div className="menu-list">

        <MenuList
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