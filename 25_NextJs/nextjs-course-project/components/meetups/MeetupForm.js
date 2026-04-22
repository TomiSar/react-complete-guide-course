import { useRef } from 'react';
import Card from '../ui/Card';
import classes from './MeetupForm.module.css';

async function covertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function MeetupForm({ onAddMeetup, onEditMeetup, meetup }) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  const updatedDate = meetup?.updatedAt
    ? new Date(meetup?.updatedAt).toLocaleDateString('fi-FI')
    : null;

  async function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value.trim();
    const selectedImageFile = imageInputRef.current.files[0];
    const enteredAddress = addressInputRef.current.value.trim();
    const enteredDescription = descriptionInputRef.current.value.trim();

    let imageAsBase64 = null;
    if (selectedImageFile) {
      try {
        imageAsBase64 = await covertToBase64(selectedImageFile);
      } catch (error) {
        console.error('Error converting file to Base64', error);
        return;
      }
    }

    const meetupData = {
      id: meetup?.id,
      title: enteredTitle,
      imageBase64: imageAsBase64,
      address: enteredAddress,
      description: enteredDescription,
    };

    console.log('Sending this data to API:', meetupData);

    if (onEditMeetup) {
      onEditMeetup(meetupData);
    } else if (onAddMeetup) {
      onAddMeetup(meetupData);
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input
            id='title'
            name='title'
            type='text'
            required
            ref={titleInputRef}
            defaultValue={meetup?.title || ''}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input
            id='image'
            name='image'
            type='file'
            ref={imageInputRef}
            accept='image/png , image/jpeg, image/jpg image/svg*'
          />
          {onEditMeetup && meetup?.image && (
            <div style={{ marginTop: '10px' }}>
              <p>Current image:</p>
              <img src={meetup.image} alt={meetup.title} width='100' />
            </div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input
            id='address'
            name='address'
            type='text'
            required
            ref={addressInputRef}
            defaultValue={meetup?.address || ''}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
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
