import { ObjectId } from 'mongodb';
import clientPromise from './connectClient';

export async function getCollectionData(collectionName = 'meetups') {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(collectionName || 'meetups');
}

export async function getMeetupDataById(meetupId) {
  try {
    const meetupsCollection = await getCollectionData();
    const meetupData = await meetupsCollection.findOne({
      _id: ObjectId.createFromHexString(meetupId),
    });

    return {
      id: meetupData._id.toString(),
      title: meetupData.title,
      address: meetupData.address,
      image: meetupData.image,
      description: meetupData.description,
    };
  } catch (error) {
    console.error('Error getting meetup data:', error);
    throw error;
  }
}
