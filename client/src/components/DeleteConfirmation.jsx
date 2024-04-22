import { useEffect } from 'react';
import classes from './DeleteConfirmation.module.css'

import ProgressBar from './ProgressBar.jsx';

const TIMER = 4000;

export default function DeleteConfirmation({ onCancel, onConfirm }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCancel();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onCancel]);

  return (
    <div
      className={classes.deleteConfirmation}>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this post?</p>
      <div className={classes.btns}>
        <div className={classes.confirmationActions}>
          <button onClick={onCancel} className={classes.buttonText}>
            No
          </button>
          <button onClick={onConfirm} className={classes.button}>
            Yes
          </button>
        </div>
        <ProgressBar timer={TIMER} />
      </div>
    </div>
  );
}
