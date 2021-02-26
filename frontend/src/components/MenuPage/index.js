import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllSiteItems } from '../../store/items'
import { fetchOneSite } from '../../store/sites';
import MenuForm from '../MenuForm';
import MenuList from '../MenuList';
import './MenuPage.css';

const MenuPage = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const { siteId } = params;
  const items = useSelector(state => state.items);
  const site = useSelector(state => state.sites);

  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  useEffect(() => {
    dispatch(fetchAllSiteItems(siteId));
    dispatch(fetchOneSite(siteId));
  }, [dispatch, siteId]);

  useEffect(() => {
    if (items[0])
      setItemsToDisplay([...items]);
  }, [dispatch, items]);

  return (
    <div className="menu">
      <a href={`/sites/${site.id}`} ><h1>Menu for {site.name}</h1></a>
      <div className="menu-list">
        <MenuList
          itemsToDisplay={itemsToDisplay}
          setItemsToDisplay={setItemsToDisplay}
          siteId={siteId}
        />
      </div>
      <MenuForm
        siteId={siteId}
        itemsToDisplay={itemsToDisplay}
        setItemsToDisplay={setItemsToDisplay}
      />
    </div>
  )
};

export default MenuPage;