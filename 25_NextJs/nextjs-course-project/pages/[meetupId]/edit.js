import { useRouter } from 'next/router';
import HeadContent from '../../components/ui/HeadContent';
import MeetupForm from '../../components/meetups/MeetupForm';
import { API_EDIT_MEETUP_URL } from '../../utils/constants';
import { getMeetupById } from '../../utils/helpers';

function EditMeetupPage({ meetup }) {
  const router = useRouter();
  async function editMeetupHandler(editedMeetupData) {
    const response = await fetch(API_EDIT_MEETUP_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedMeetupData),
    });

    // const data = await response.json();
    // console.log(data);
    router.push('/');
  }

  return (
    <>
      <HeadContent
        title='Edit a Meetup'
        content='Edit your own meetup details and create amazing networking opportunities!'
      />
      <MeetupForm onEditMeetup={editMeetupHandler} meetup={meetup} />
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.meetupId;
  const meetup = await getMeetupById(id);

  return {
    props: {
      meetup,
    },
  };
}

export default EditMeetupPage;
