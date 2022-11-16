import React, { useState } from 'react';
import MenuItem from './MenuItem';
import Logo from '../../assets/icons/Logo.png';
import styles from './MenuBar.module.scss';

const MENU_ITEMS = ['Home', 'Video', 'Settings'];

function MenuBar() {
  const [selectedTab, setSelectedTab] = useState('Home');
  const tabHandler = (tab: string) => setSelectedTab(tab);

  return (
    <div id="menubar" className={styles.menuBar}>
      <div id="menuLogo" className={styles.menuLogo}>
        <img src={Logo} alt="Logo" />
      </div>
      <div id="menuItems" className={styles.menuItems}>
        {MENU_ITEMS.map((tab: string) => (
          <MenuItem
            key={tab}
            isSelected={selectedTab === tab}
            tabHandler={tabHandler}
            tab={tab}
          />
        ))}
      </div>
      <div id="menuProfile" className={styles.menuProfile}>
        {/* {uid} */}
        P
      </div>
    </div>
  );
}

export default MenuBar;
