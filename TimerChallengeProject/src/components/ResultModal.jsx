import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ResultModal({
  ref,
  targetTime,
  timeRemaining,
  onReset,
}) {
  const dialog = useRef();
  const playerLost = timeRemaining <= 0;
  const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
  const playerScore = Math.round(
    (1 - timeRemaining / (targetTime * 1000)) * 100
  );

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className='result-modal' ref={dialog}>
      {playerLost && <h2>You lost</h2>}
      {!playerLost && <h2>Your score: {playerScore}</h2>}
      <p>
        The target time was <strong>{targetTime.toFixed(2)}</strong> seconds
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedTimeRemaining} seconds left</strong>
      </p>
      <form onSubmit={onReset} method='dialog'>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
}
