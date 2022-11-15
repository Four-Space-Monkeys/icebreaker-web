import React from 'react';
import Home from '../../assets/icons/home_FILL0_wght400_GRAD0_opsz48.svg';
import styles from './MenuBar.module.scss';

export default function MenuItem({
  isSelected, tabHandler, tab,
}: {
  isSelected: boolean;
  tabHandler: Function;
  tab: string;
}) {
  return (
    <div
      id={tab}
      className={`${styles.menuItem} ${isSelected ? styles.isSelected : ''}`}
    >
      <button
        className={styles.tab}
        type="button"
        onClick={() => tabHandler(tab)}
      >
        <img src={Home} alt="home" />
      </button>
    </div>
  );
}
