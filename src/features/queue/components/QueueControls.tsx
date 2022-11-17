import React from 'react';
import styles from './queue.module.scss';

function QueueControls({
  inQueue,
  joinQueue,
  exitQueue,
}: {
  inQueue: boolean;
  joinQueue: React.MouseEventHandler<HTMLButtonElement> | undefined;
  exitQueue: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className={styles.queueControlContainer}>
      <button
        type="button"
        disabled={inQueue}
        onClick={joinQueue}
      >
        Join Queue
      </button>
      {inQueue && (
        <button
          type="button"
          onClick={exitQueue}
        >
          Exit Queue
        </button>
      )}
    </div>
  );
}

export default QueueControls;
