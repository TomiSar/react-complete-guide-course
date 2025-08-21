import { createPortal } from 'react-dom';
import Card from './Card';
import classes from './ConfirmModal.module.css';

function ConfirmModal({ show, title, message, onCancel, onConfirm }) {
  if (!show) {
    return null;
  }

  function handleStopPropagation(event) {
    event.stopPropagation();
  }

  const modalContent = (
    <div className={classes.backdrop}>
      <Card className={classes.modal} onClick={handleStopPropagation}>
        <header className={classes.header}>
          <h2>{title}</h2>
        </header>
        <div className={classes.content}>
          <h3>{message}</h3>
          <p>(Note!! Data will be permanently deleted)</p>
        </div>
        <footer className={classes.actions}>
          <button className={classes.btnCancel} onClick={onCancel}>
            Cancel
          </button>
          <button className={classes.btnConfirm} onClick={onConfirm}>
            Confirm
          </button>
        </footer>
      </Card>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById('modal-confirm-root')
  );
}

export default ConfirmModal;
