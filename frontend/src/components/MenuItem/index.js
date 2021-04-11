import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMenuItem } from "../../store/items";
import { editMenuItemDispatcher } from "./MenuItemUtils";
// TODO: implement react-sortable-hoc documentation: https://www.npmjs.com/package/react-sortable-hoc

const MenuItem = ({ item, itemsToDisplay, setItemsToDisplay, siteId }) => {


  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [editing, setEditing] = useState(false);
  const [menuItemDisplayed, setMenuItemDisplayed ] = useState({});

  const handleMenuDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteMenuItem(siteId, item.id))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
    setItemsToDisplay([...itemsToDisplay.filter(setItem => setItem.id != item.id)]);
  }

  useEffect(() => {
    setMenuItemDisplayed(item);
    setEditing(false);
  },[item])

  const updateClickHandler = () => {
    editMenuItemDispatcher(item.id, siteId, menuItemDisplayed)
  }

  return (
    <div 
      className="menu-item"
      >        
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className="menu-item_image">
        <div className="menu-item_image-image">
          {item.imgUrl && <img src={item.imgUrl} alt="site item" />}
        </div>
        <div className="menu-item_image-is_active">
          {item.isActive ? "Showing" : "Hidden"}
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
        <button 
          id="menu-item_delete_button" 
          onClick={handleMenuDelete}
        >
          Delete
        </button>
        {/* <button 
          id="menu-item_edit_button" 
          onClick={handleMenuEdit}
        >
          Edit
        </button> 
        TODO: IMPLEMENT EDIT FUNCTIONALITY FOR MENU ITEM
        */}
      </div>
    </div>
  )
};

export default MenuItem;