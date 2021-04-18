import React from 'react';
import { SocialIcon } from "react-social-icons";
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="icons">
        <SocialIcon className="icon" url="https://github.com/percist" />
        <SocialIcon className="icon" url="https://www.linkedin.com/in/crclark101010/" />
        <SocialIcon className="icon" url="mailto:percist@gmail.com" />
        <SocialIcon className="icon" url="https://angel.co/u/chris-clark-49" />
      </div>
      <h2>Copyright Chris Clark, 2021</h2>
    </div >
  )
};

export default Footer;