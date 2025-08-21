import HeadContent from '../components/ui/HeadContent';
import MeetupList from '../components/meetups/MeetupList';
import { getCollectionData } from '../utils/helpers';

function HomePage(props) {
  return (
    <>
      <HeadContent
        title='React Meetups'
        content='Browse a huge list of highly active React meetups!'
      />
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from database
  const meetupsCollection = await getCollectionData();
  const sortedMeetups = await meetupsCollection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return {
    props: {
      meetups: sortedMeetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        createdAt: meetup.createdAt.toISOString(),
        updatedAt: meetup.updatedAt.toISOString(),
      })),
    },
  };
}

export default HomePage;

// export async function getServerSideProps(context) {
//   const res = context.res;
//   const req = context.req;

//   // Fetch data from an API or database
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
