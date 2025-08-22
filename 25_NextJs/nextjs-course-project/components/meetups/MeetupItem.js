import { useState } from 'react';
import { useRouter } from 'next/router';
import Card from '../ui/Card';
import ConfirmModal from '../ui/ConfirmModal';
import classes from './MeetupItem.module.css';
import { API_DELETE_MEETUP_URL } from '../../utils/constants';

function MeetupItem(meetup) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const createdDate = new Date(meetup.createdAt).toLocaleDateString('fi-FI');

  function showMeetupHandler() {
    router.push(`/${meetup.id}`);
  }

  function editMeetupHandler() {
    router.push(`/${meetup.id}/edit`);
  }

  function openDeleteModalHandler() {
    setModalIsOpen(true);
  }

  function cancelDeleteModalHandler() {
    setModalIsOpen(false);
  }

  async function confirmDeleteHandler() {
    setModalIsOpen(false);

    try {
      const response = await fetch(API_DELETE_MEETUP_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: meetup.id }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete meetup ${meetup.title} with ID: ${meetup.id}`
        );
      }
      router.replace('/').then(() => router.reload());
    } catch (error) {
      console.error('Error deleting meetup:', error);
      alert(`Failed to delete meetup: ${error.message}`);
    }
  }

  return (
    <>
      <ConfirmModal
        show={modalIsOpen}
        title={`Delete ${meetup.title}`}
        message={`Are you sure you want to delete ${meetup.title}?`}
        onCancel={cancelDeleteModalHandler}
        onConfirm={confirmDeleteHandler}
      />
      <li className={classes.item}>
        <Card>
          <div className={classes.image}>
            <img src={meetup.image} alt={meetup.title} />
          </div>
          <div className={classes.content}>
            <h2>{meetup.title}</h2>
            <address>{meetup.address}</address>
            <p>{meetup.description}</p>
            <div className={classes.timestamps}>
              <small>Created on: {createdDate}</small>
            </div>
          </div>
          <div className={classes.actions}>
            <button className={classes.btnShow} onClick={showMeetupHandler}>
              Show Meetup
            </button>
            <button className={classes.btnEdit} onClick={editMeetupHandler}>
              Edit Meetup
            </button>
            <button
              className={classes.btnDelete}
              onClick={openDeleteModalHandler}
            >
              Delete Meetup
            </button>
          </div>
        </Card>
      </li>
    </>
  );
}

export default MeetupItem;
