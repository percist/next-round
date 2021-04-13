import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMenuItem, editMenuItem } from "../../store/items";
import MenuEditForm from '../MenuEditForm';
import MenuItem from '../MenuItem';
import { editMenuItemDispatcher } from "./MenuItemUtils";
// TODO: implement react-sortable-hoc documentation: https://www.npmjs.com/package/react-sortable-hoc
const MenuItemContainer = ({ item, itemsToDisplay, setItemsToDisplay, siteId }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToDisplay, setItemToDisplay] = useState({})

  const handleMenuDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are You Sure?")){
      await dispatch(deleteMenuItem(siteId, item.id))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        })
      setItemsToDisplay([...itemsToDisplay.filter(setItem => setItem.id != item.id)]);
    }
  }

  useEffect(() => {
    setItemToDisplay(item)
    setIsEditing(false);
  }, [item])

  const handleMenuEdit = () => setIsEditing(!isEditing);

  return (
    <div
      className="menu-item"
    >
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      {!isEditing &&
        <MenuItem item={itemToDisplay} />
      }
      {isEditing &&
        <MenuEditForm
          siteId={siteId}
          item={itemToDisplay}
          setIsEditing={setIsEditing}
          setItemToDisplay={setItemToDisplay}
        />
      }
      <button
        id="menu-item_delete_button"
        onClick={handleMenuDelete}
      >
        Delete
            </button>
      <button
        id="menu-item_edit_button"
        onClick={handleMenuEdit}
      >
        Edit
            </button>
    </div>
  )
};

export default MenuItemContainer;