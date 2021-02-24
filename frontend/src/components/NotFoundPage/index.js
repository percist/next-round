import React from 'react';
import image from '../../N.png';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div id="error-page">
      <div id="error-page_img">
        <img src={image} alt="logo" />
      </div>
      <div id="error-page_message">
        <h1> That's not a thing. </h1>
        <h2> Try clicking on the Home icon at the top</h2>
      </div>
    </div>
  )
}
export default NotFoundPage;