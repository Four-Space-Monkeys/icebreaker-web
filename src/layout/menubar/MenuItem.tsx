import React from 'react';
import styles from './MenuBar.module.scss';

export default function MenuItem({
  isSelected, tabHandler, tab, icon,
}: {
  isSelected: boolean;
  tabHandler: Function;
  tab: string;
  icon: string;
}) {
  return (
    <div id={icon} className={isSelected ? 'green' : ''}>
      <button type="button" onClick={() => tabHandler(tab)}>
        {tab}
      </button>
    </div>
  );
}
