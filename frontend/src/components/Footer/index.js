import React from 'react';
import { SocialIcon } from "react-social-icons";
import './Footer.css';

const Footer = () => {
  return (
    <div id="footer">
      <div className="icons">
        <SocialIcon 
          className="icon" 
          alt="link to github profile"
          url="https://github.com/percist" />
        <SocialIcon 
          className="icon" 
          alt="link to linkedin profile"
          url="https://www.linkedin.com/in/crclark101010/" />
        <SocialIcon 
          className="icon" 
          alt="send mail to Chris Clark"
          url="mailto:percist@gmail.com" />
        <SocialIcon 
          className="icon" 
          alt="link to AngelList profile"
          url="https://angel.co/u/chris-clark-49" />
      </div>
      <div id="footer-copywrite">
        Copyright Chris Clark, 2021
      </div>
    </div >
  )
};

export default Footer;