/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './queue.module.scss';

function InterestListItem({
  name,
  selected,
  onClick,
}: {
  name: string;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <div
      className={selected ? styles.selected : styles.unselected}
      onClick={onClick}
    >
      {name}
    </div>
  );
}

export default InterestListItem;
