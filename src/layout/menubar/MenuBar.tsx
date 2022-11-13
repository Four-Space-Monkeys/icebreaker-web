import React, { useState } from 'react';
import MenuItem from './MenuItem';
import styles from './MenuBar.module.scss';

const MENU_ITEMS = ['Home', 'About', 'Contact', 'Video'];

function MenuBar({ uid }: { uid: number }) {
  const [selectedTab, setSelectedTab] = useState('Home');
  const tabHandler = (tab: string) => setSelectedTab(tab);

  return (
    <div id="menubar" className={styles.menuBar}>
      <div id="logo">Logo</div>
      <div id="menuItems" className={styles.menuItems}>
        {MENU_ITEMS.map((tab: string) => (
          <MenuItem
            key={tab}
            isSelected={selectedTab === tab}
            tabHandler={tabHandler}
            tab={tab}
            icon={tab}
          />
        ))}
      </div>
      <div id="profile">
        Profile:
        {' '}
        {uid}
      </div>
    </div>
  );
}

export default MenuBar;
