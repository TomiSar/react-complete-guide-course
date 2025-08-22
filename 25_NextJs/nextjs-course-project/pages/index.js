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

export async function getServerSideProps() {
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
        createdAt: meetup.createdAt ? meetup.createdAt.toISOString() : null,
        updatedAt: meetup.updatedAt ? meetup.updatedAt.toISOString() : null,
      })),
    },
  };
}

// THIS caused some latest data fetching issues (switched to getServerSideProps)
// export async function getStaticProps() {
//   const meetupsCollection = await getCollectionData();
//   const sortedMeetups = await meetupsCollection
//     .find({})
//     .sort({ createdAt: -1 })
//     .toArray();

//   return {
//     props: {
//       meetups: sortedMeetups.map((meetup) => ({
//         id: meetup._id.toString(),
//         title: meetup.title,
//         address: meetup.address,
//         image: meetup.image,
//         description: meetup.description,
//         createdAt: meetup.createdAt.toISOString(),
//         updatedAt: meetup.updatedAt.toISOString(),
//       })),
//     },
//     revalidate: 1,
//   };
// }

export default HomePage;
