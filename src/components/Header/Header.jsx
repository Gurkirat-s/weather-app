import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { TbArrowBigRight } from 'react-icons/tb';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeContext } from '../../context/ThemeContext';

const Header = ({ toggleSidebar, hideSidebar, changeTheme }) => {
  const theme = useContext(ThemeContext);

  const handleDarkModeChange = () => {
    changeTheme();
  };

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <header className={theme === 'dark' ? 'header dark-theme' : 'header'}>
      <div className="logo">
        <img src="./logo.png" alt="Max Weather Logo" />
      </div>
      <div className={hideSidebar ? 'icons' : 'icons sidebar-visible'}>
        <DarkModeSwitch
          className="darkmode-btn"
          checked={theme === 'dark'}
          moonColor="#edf2f4"
          onChange={handleDarkModeChange}
        />
        <div className="sidebar-icons">
          <TbArrowBigRight
            onClick={handleToggleSidebar}
            className={hideSidebar ? 'menu-btn close hidden' : 'menu-btn close'}
          />

          <AiOutlineMenu
            onClick={handleToggleSidebar}
            className={hideSidebar ? 'menu-btn open' : 'menu-btn open hidden'}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
