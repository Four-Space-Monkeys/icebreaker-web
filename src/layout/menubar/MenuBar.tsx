import React, { useState } from 'react';
import MenuItem from './MenuItem';

const MENU_ITEMS = ['Home', 'About', 'Contact', 'Video'];

function MenuBar({ uid }: { uid: number }) {
  const [selectedTab, setSelectedTab] = useState('Home');
  const tabHandler = (tab: string) => setSelectedTab(tab);

  return (
    <div id="menubar">
      <div id="logo">Logo</div>
      <div id="menuItems">
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