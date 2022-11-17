import React, { useState, useEffect } from 'react';
import { useStytch } from '@stytch/react';
import MenuItem from './MenuItem';
import Logo from '../../assets/icons/Logo.png';
import styles from './MenuBar.module.scss';

const MENU_ITEMS = ['Home', 'Video', 'Settings', 'Logout'];

function MenuBar({ firstName }: { firstName: string }) {
  const client = useStytch();
  const [selectedTab, setSelectedTab] = useState('Home');

  useEffect(() => {
    const signOut = async () => {
      await client.session.revoke();
      alert('Logged Out!');
    };
    if (selectedTab === 'Logout') {
      signOut();
    }
  }, [client.session, selectedTab]);

  const tabHandler = (tab: string) => { setSelectedTab(tab); };

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
        {firstName[0].toUpperCase()}
      </div>
    </div>
  );
}

export default MenuBar;
