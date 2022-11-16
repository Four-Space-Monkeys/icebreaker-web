import React from 'react';
import home from '../../assets/icons/home_FILL0_wght400_GRAD0_opsz48.svg';
import video from '../../assets/icons/videocam_FILL0_wght400_GRAD0_opsz48.svg';
import setting from '../../assets/icons/settings_FILL0_wght400_GRAD0_opsz48.svg';
import styles from './MenuBar.module.scss';

export default function MenuItem({
  isSelected, tabHandler, tab,
}: {
  isSelected: boolean;
  tabHandler: Function;
  tab: string;
}) {
  let icons = null;

  switch (tab) {
    case 'Home':
      icons = home;
      break;
    case 'Video':
      icons = video;
      break;
    case 'Settings':
      icons = setting;
      break;
    default:
      icons = home;
  }

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
        <img src={icons} alt={tab} />
      </button>
    </div>
  );
}
