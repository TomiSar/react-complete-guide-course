import MeetupDetail from '../../components/meetups/MeetupDetail';
import HeadContent from '../../components/ui/HeadContent';
import { getCollectionData } from '../../utils/helpers';
import { ObjectId } from 'mongodb';

function MeetupDetails(props) {
  const { image, title, address, description, createdAt, updatedAt } =
    props.meetupData;

  return (
    <>
      <HeadContent title={title} content={description} />
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    </>
  );
}

export async function getStaticPaths() {
  // Fetch data from database
  const meetupsCollection = await getCollectionData();
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // Fetch data from database
  const meetupsCollection = await getCollectionData();
  const meetupData = await meetupsCollection.findOne({
    _id: ObjectId.createFromHexString(meetupId),
  });

  // Fetch data for a single meetup using the meetupId
  return {
    props: {
      meetupData: {
        id: meetupData._id.toString(),
        title: meetupData.title,
        address: meetupData.address,
        image: meetupData.image,
        description: meetupData.description,
        createdAt: meetupData.createdAt.toISOString(),
        updatedAt: meetupData.updatedAt.toISOString(),
      },
    },
    revalidate: 1,
  };
}

export default MeetupDetails;
