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
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      })),
    },
  };
}

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

export default HomePage;
