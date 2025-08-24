import HeadContent from '../components/ui/HeadContent';
import MeetupList from '../components/meetups/MeetupList';
import { getSortedMeetups } from '../utils/helpers';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

function HomePage(props) {
  return (
    <>
      <HeadContent
        title='React Meetups'
        content='Browse a huge list of highly active React meetups!'
      />
      {props.meetups && props.meetups.length === 0 && (
        <h1>No meetups created yet</h1>
      )}
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from database and sort by latest activity
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };
  }

  const sortedMeetups = await getSortedMeetups();
  const meetups = sortedMeetups.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
    description: meetup.description,
    creator: meetup.creator.toString(),
    createdAt: meetup.createdAt.toISOString(),
    updatedAt: meetup.updatedAt.toISOString(),
  }));

  const serializableSession = {
    user: {
      name: session.user.name,
      email: session.user.email,
      id: session.user.id,
      role: session.user.role,
    },
    expires: session.expires,
  };

  return {
    props: {
      meetups: meetups,
      session: serializableSession,
    },
  };
}

export default HomePage;

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
