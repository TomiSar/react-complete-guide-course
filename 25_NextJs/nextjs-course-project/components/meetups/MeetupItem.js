import { useRouter } from 'next/router';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import { API_DELETE_MEETUP_URL } from '../../utils/constants';

function MeetupItem(meetup) {
  const router = useRouter();

  function showMeetupHandler() {
    router.push(`/${meetup.id}`);
  }

  function editMeetupHandler() {
    router.push(`/${meetup.id}/edit`);
  }

  async function deleteMeetupHandler() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the meetup: ${meetup.title}?`
    );

    if (!confirmDelete) {
      return;
    }

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

      router.push('/');
    } catch (error) {
      console.error('Error deleting meetup:', error);
      alert(`Failed to delete meetup: ${error.message}`);
      router.push('/');
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={meetup.image} alt={meetup.title} />
        </div>
        <div className={classes.content}>
          <h2>{meetup.title}</h2>
          <address>{meetup.address}</address>
          <p>{meetup.description}</p>
        </div>
        <div className={classes.actions}>
          <button className={classes.btnShow} onClick={showMeetupHandler}>
            Show Meetup
          </button>
          <button className={classes.btnEdit} onClick={editMeetupHandler}>
            Edit Meetup
          </button>
          <button className={classes.btnDelete} onClick={deleteMeetupHandler}>
            Delete Meetup
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
