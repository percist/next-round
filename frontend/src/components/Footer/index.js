import React from 'react';
import { SocialIcon } from "react-social-icons";
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="icons">
              <SocialIcon url="https://github.com/percist" />
              <SocialIcon url="https://www.linkedin.com/in/crclark101010/" />
              <SocialIcon url="mailto:percist@gmail.com" />
              <SocialIcon url="https://angel.co/u/chris-clark-49" />

            </div>
            <h2>Copyright Chris Clark, 2021</h2>
        </div >
    )
    
}

export default Footer;