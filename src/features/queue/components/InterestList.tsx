import React from 'react';
import { Interest } from '../../../types';
import InterestListItem from './InterestListItem';
import styles from './queue.module.scss';

function InterestList({
  inQueue,
  interests,
  selectedInterestIds,
  setSelectedInterestIds,
}: {
  inQueue: boolean;
  interests: Interest[];
  selectedInterestIds: number[];
  setSelectedInterestIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  function addToSelectedInterests(interestId: number) {
    const copy = selectedInterestIds.slice();
    copy.push(interestId);
    setSelectedInterestIds(copy);
  }

  function removeFromSelectedInterests(interestId: number) {
    const copy = selectedInterestIds.filter((id) => id !== interestId);
    setSelectedInterestIds(copy);
  }

  return (
    <div className={styles.interestList}>
      {interests.map(({ id, name }) => {
        const selected = selectedInterestIds.includes(id);

        let onClick: React.MouseEventHandler<HTMLDivElement> | undefined;

        if (!inQueue) {
          onClick = selected
            ? () => removeFromSelectedInterests(id)
            : () => addToSelectedInterests(id);
        }

        return (
          <InterestListItem
            key={id}
            name={name}
            selected={selected}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
}

export default InterestList;
