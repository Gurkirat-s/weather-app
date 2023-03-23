import React, { useState } from 'react';
import './Header.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Header = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const handleDarkModeChange = () => {
    console.log('theme changed');
    setDarkMode((prev) => !prev);
  };

  return (
    <header class="header">
      <div className="logo">
        <img src="./logo.png" alt="Max Weather Logo" />
      </div>
      <div className="icons">
        <DarkModeSwitch
          class="darkmode-btn"
          checked={isDarkMode}
          moonColor="#0077b6"
          onChange={handleDarkModeChange}
        />
        <AiOutlineMenu class="menu-btn" />
      </div>
    </header>
  );
};

export default Header;
