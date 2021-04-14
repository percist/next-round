import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editMenuItem } from '../../store/items';

const MenuEditForm = ({ siteId, item, setIsEditing, itemsToDisplay, setItemsToDisplay }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState('0.00');
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState("Inactive");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const updatedItem = {
      id: item.id,
      name,
      description,
      price: (price * 100),
      image,
      isActive
    }
    console.log(updatedItem)
    const newItem = await dispatch(editMenuItem(siteId, updatedItem))
      .catch(res => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      })
    
    setItemsToDisplay([...itemsToDisplay.filter(itemDisplayed => itemDisplayed.id != item.id), newItem].sort((a,b)=> a.order < b.order));
    setIsEditing(false);
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  useEffect(()=>{
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price/100);
    setImage(item.imgUrl);
    setIsActive(item.isActive);
  },[item])

  return (
    <div className="menu-edit-item-form">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <form id="menu-edit-item-form_form" onSubmit={handleSubmit}>
        <div className="menu-item-form_image">
          <div className="menu-item_image-image">
            {image && <img src={image} alt="site item" />}
          </div>
          <input
                className="input menu-item-form_input"
                type="file"
                onChange={updateFile}
              />
          <div className="menu-item_is-active">
            <label id="isActive-label">
                  Display Item?
                    </label>
                <input
                  className="input menu-item-form_input"
                  type="checkbox"
                  id="isActive"
                  checked={isActive === "Active"}
                  onChange={ ()=>   isActive === "Active" ? 
                    setIsActive("Inactive") :
                    setIsActive("Active") 
                  }
                />
          </div>
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
        <button
          className="button"
          id="menu-edit-item-form_button"
          type="submit"
          >
          Update Menu Item
                </button>
          </div>
      </form>
    </div>
  )
};

export default MenuEditForm;