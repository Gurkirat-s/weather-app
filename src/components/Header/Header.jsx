import React, { useState } from 'react';
import './Header.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { TbArrowBigRight } from 'react-icons/tb';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Header = ({ toggleSidebar }) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(true);

  const handleDarkModeChange = () => {
    console.log('theme changed');
    setDarkMode((prev) => !prev);
  };

  const handleToggleSidebar = () => {
    toggleSidebar();
    setHideSidebar((prev) => !prev);
  };

  return (
    <header class="header">
      <div className="logo">
        <img src="./logo.png" alt="Max Weather Logo" />
      </div>
      <div className={hideSidebar ? 'icons' : 'icons sidebar-visible'}>
        <DarkModeSwitch
          class="darkmode-btn"
          checked={isDarkMode}
          moonColor="#0077b6"
          onChange={handleDarkModeChange}
        />
        <div className="sidebar-icons">
          <TbArrowBigRight
            onClick={handleToggleSidebar}
            class={hideSidebar ? 'menu-btn close hidden' : 'menu-btn close'}
          />

          <AiOutlineMenu
            onClick={handleToggleSidebar}
            class={hideSidebar ? 'menu-btn open' : 'menu-btn open hidden'}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
