/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

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
      className={selected ? 'interest-list-item-selected' : 'interest-list-item'}
      style={selected ? { color: 'red' } : { color: 'black' }}
      onClick={onClick}
    >
      {name}
    </div>
  );
}

export default InterestListItem;
