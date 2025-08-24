import MeetupDetail from '../../components/meetups/MeetupDetail';
import HeadContent from '../../components/ui/HeadContent';
import { getMeetupById, getSortedMeetups } from '../../utils/helpers';

function MeetupDetails(props) {
  const { image, title, address, description, creator, createdAt, updatedAt } =
    props.meetup;

  return (
    <>
      <HeadContent title={title} content={description} />
      <MeetupDetail
        title={title}
        image={image}
        address={address}
        description={description}
        creator={creator}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    </>
  );
}

export async function getStaticPaths() {
  const meetups = await getSortedMeetups();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;

  const meetup = await getMeetupById(id);
  if (!meetup) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      meetup: meetup,
    },
    revalidate: 1,
  };
}

export default MeetupDetails;
