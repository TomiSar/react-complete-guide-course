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
      createdAt: meetupData.createdAt.toISOString(),
      updatedAt: meetupData.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error getting meetup data:', error);
    throw error;
  }
}

export async function getSortedCollectionData(collectionName = 'meetups') {
  try {
    const dataCollection = await getCollectionData(collectionName);
    // Sort descending by createdAt
    // const sortedMeetups = await meetupsCollection
    //   .find({})
    //   .sort({ createdAt: -1 })
    //   .toArray();

    // Sort by latest activity, using updatedAt if available, otherwise createdAt
    const sortedDataCollection = await dataCollection
      .aggregate([
        {
          $addFields: {
            latestActivity: { $ifNull: ['$updatedAt', '$createdAt'] },
          },
        },
        {
          $sort: { latestActivity: -1 },
        },
      ])
      .toArray();
    return sortedDataCollection;
  } catch (error) {
    console.error('Error fetching sorted meetups:', error);
    throw new Error('Could not fetch meetups.');
  }
}
