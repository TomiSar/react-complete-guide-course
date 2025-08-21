import { useRouter } from 'next/router';
import HeadContent from '../../components/ui/HeadContent';
import MeetupForm from '../../components/meetups/MeetupForm';
import { API_EDIT_MEETUP_URL } from '../../utils/constants';
import { getMeetupDataById } from '../../utils/helpers';

function EditMeetupPage({ meetupData }) {
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
      <MeetupForm onEditMeetup={editMeetupHandler} meetupData={meetupData} />
    </>
  );
}

export async function getServerSideProps(context) {
  const meetupId = context.params.meetupId;
  const meetupData = await getMeetupDataById(meetupId);

  return {
    props: {
      meetupData,
    },
  };
}

export default EditMeetupPage;
