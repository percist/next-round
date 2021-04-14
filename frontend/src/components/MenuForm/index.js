import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewItem } from '../../store/items';
import './MenuForm.css';

const MenuForm = ({ siteId, itemsToDisplay, setItemsToDisplay }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState('0.00');
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleClick = () => setIsActive(!isActive);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const item = {
      name,
      description,
      price: (price * 100),
      image,
      isActive
    }
    const newItem = await dispatch(createNewItem(siteId, item))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
    setName("");
    setDescription("");
    setPrice("");
    setIsActive(false)
    setImage(null);
    setItemsToDisplay(itemsToDisplay.splice(newItem.order, 0, newItem));
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  return (
    <div className="menu-item-form">
      <h2>Add a menu item</h2>
      <form id="menu-item-form_form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div id="menu-item-form_form">
          <div className="menu-item-form_field">
            <label>
              Name
            </label>
            <input
              className="input menu-item-form_input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="menu-item-form_field">
            <label>
              Description
                  </label>
            <input
              className="input menu-item-form_input"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="menu-item-form_field">
            <label>
              Price
                </label>
            <input
              className="input menu-item-form_input"
              type="number"
              min="1"
              max="1000"
              step=".01"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="menu-item-form_field">

            <label>
              Item Picture
                </label>
            <input
              className="input menu-item-form_input"
              type="file"
              onChange={updateFile}
            />
          </div>
          <div className="menu-item-form_field" id="menu-item-form_field-isActive">

            <label id="isActive-label">
              Display Item?
                </label>
            <input
              className="input menu-item-form_input"
              type="checkbox"
              id="isActive"
              value={isActive}
              onChange={handleClick}
            />
          </div>
        </div>
        <button
          className="button"
          id="menu-item-form_button"
          type="submit"
        >
          Add Item to Menu
                </button>
      </form>
    </div>
  )
};

export default MenuForm;