import React from 'react';

type Props = {
  tabHandler: Function;
  tab: string;
  icon: string;
};
// Buttons
export default function MenuItem({ tabHandler, tab, icon }: Props) {
  return (
    <div id={icon}>
      <button type="button" onClick={() => tabHandler(tab)}>
        {tab}
      </button>
    </div>
  );
}
