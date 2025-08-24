import { useRef } from 'react';
import Card from '../ui/Card';
import classes from './MeetupForm.module.css';

function MeetupForm({ onAddMeetup, onEditMeetup, meetup }) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  const updatedDate = meetup?.updatedAt
    ? new Date(meetup?.updatedAt).toLocaleDateString('fi-FI')
    : null;

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value.trim();
    const enteredImage = imageInputRef.current.value.trim();
    const enteredAddress = addressInputRef.current.value.trim();
    const enteredDescription = descriptionInputRef.current.value.trim();

    const formData = {
      id: meetup?.id, // Only if edit
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    if (onEditMeetup) {
      onEditMeetup(formData);
    } else if (onAddMeetup) {
      onAddMeetup(formData);
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input
            type='text'
            required
            id='title'
            ref={titleInputRef}
            defaultValue={meetup?.title || ''}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input
            type='url'
            required
            id='image'
            ref={imageInputRef}
            defaultValue={meetup?.image || ''}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            required
            id='address'
            ref={addressInputRef}
            defaultValue={meetup?.address || ''}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
            defaultValue={meetup?.description || ''}
          ></textarea>
        </div>
        <div className={classes.actions}>
          {updatedDate && (
            <small className={classes.timestamps}>
              Updated on: {updatedDate}
            </small>
          )}
          <button>{onEditMeetup ? 'Edit Meetup' : 'Add Meetup'}</button>
        </div>
      </form>
    </Card>
  );
}

export default MeetupForm;
