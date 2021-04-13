import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editItem } from '../../store/items';
import './MenuPage.css';

const MenuEditForm = ({ siteId, item, setIsEditing, setItemToDisplay }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState('0.00');
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleClick = () => setIsActive(!isActive)

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
    const newItem = await dispatch(editItem(siteId, item))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
    setItemToDisplay(newItem);
    setIsEditing(false);
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  useEffect(()=>{
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setImage(item.imgUrl);
    setIsActive(item.isActive);
  },[item])

  return (
    <div className="menu-edit-item-form">
      <form id="menu-edit-item-form_form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <h2>Editing</h2>
        <div className="menu-item_image">
          <div className="menu-item_image-image">
            {image && <img src={image} alt="site item" />}
          </div>
          <input
                className="input menu-item-form_input"
                type="file"
                onChange={updateFile}
              />
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
        <div className="menu-edit-item-form_info">


          <div className="menu-edit-item-form_field">
            <label>
              Name
            </label>
            <input
              className="input menu-edit-item-form_input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="menu-edit-item-form_field">
            <label>
              Description
                  </label>
            <input
              className="input menu-edit-item-form_input"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="menu-edit-item-form_field">
            <label>
              Price
                </label>
            <input
              className="input menu-edit-item-form_input"
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
        </div>
        <button
          className="button"
          id="menu-edit-item-form_button"
          type="submit"
        >
          Add Item to Menu
                </button>
      </form>
    </div>
  )
};

export default MenuEditForm;