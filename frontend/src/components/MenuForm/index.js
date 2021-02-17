import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { createNewItem } from '../../store/items'

const MenuForm = ({ siteId, itemsToDisplay, setItemsToDisplay }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState('0.00');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const item = {
      name,
      description,
      price: (price * 100),
      image
    }
    const newItem = await dispatch(createNewItem(siteId, item))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
    setName("");
    setDescription("");
    setPrice("");
    setImage(null);
    setItemsToDisplay([...itemsToDisplay, newItem])
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file)
  }

  return (
    <div className="menu-item-form">
      <h2>Add an item to your menu</h2>
      <form id="menu-item-form_form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div id="menu-item-form_form">
          <div class="menu-item-form_field">
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
          <div class="menu-item-form_field">
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
          <div class="menu-item-form_field">
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
          <div class="menu-item-form_field">

            <label>
              Item Picture
                </label>
            <input
              className="input menu-item-form_input"
              type="file"
              onChange={updateFile}
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
}

export default MenuForm;