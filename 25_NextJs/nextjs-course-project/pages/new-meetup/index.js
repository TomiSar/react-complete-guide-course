import { useRouter } from 'next/router';
import HeadContent from '../../components/ui/HeadContent';
import MeetupForm from '../../components/meetups/MeetupForm';
import { API_NEW_MEETUP_URL } from '../../utils/constants';

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(newMeetupData) {
    const response = await fetch(API_NEW_MEETUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMeetupData),
    });

    // const data = await response.json();
    // console.log(data);
    router.push('/');
  }

  return (
    <>
      <HeadContent
        title='Add a New Meetup'
        content='Add your own meetups and create amazing networking opportunities!'
      />
      <MeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetupPage;
