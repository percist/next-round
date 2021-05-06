import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {SortableElement} from 'react-sortable-hoc'
import { deleteMenuItem } from "../../store/items";
import MenuEditForm from '../MenuEditForm';
import MenuItem from '../MenuItem';

const MenuItemContainer = SortableElement(({ item, itemsToDisplay, setItemsToDisplay, siteId, index }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleMenuDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are You Sure?")){
      await dispatch(deleteMenuItem(siteId, item.id))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        })
      setItemsToDisplay([...itemsToDisplay.filter(setItem => setItem.id != item.id)].sort((a,b)=> a.id < b.id));
    }
  }

  useEffect(() => {
    setIsEditing(false);
  }, [])

  const handleMenuEdit = () => setIsEditing(!isEditing);

  return (
    <div
      className="menu-item-container menu-list-item"
      key={item.id}
      index={index}
    >
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      {!isEditing &&
        <MenuItem item={item} />
      }
      {isEditing &&
        <MenuEditForm
          siteId={siteId}
          item={item}
          setIsEditing={setIsEditing}
          itemsToDisplay={itemsToDisplay}
          setItemsToDisplay={setItemsToDisplay}
        />
      }
      <div className="menu-item_buttons">
        <button
          id="menu-item_edit_button"
          onClick={handleMenuEdit}
        >
          {isEditing? "Cancel" : "Edit"}
        </button>
        <button
          id="menu-item_delete_button"
          onClick={handleMenuDelete}
        >
          Delete
        </button>
      </div>
     
    </div>
  )
});

export default MenuItemContainer;