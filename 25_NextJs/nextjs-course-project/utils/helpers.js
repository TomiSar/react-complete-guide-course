import { connectDB } from './connectDB';
import Meetup from '../models/Meetup';

export async function getMeetupById(id) {
  await connectDB();
  try {
    const data = await Meetup.findById(id)
      .populate('creator', 'name email')
      .lean();
    if (!data) return null;

    return {
      id: data._id.toString(),
      title: data.title,
      image: data.image,
      address: data.address,
      description: data.description,
      creator: {
        id: data.creator._id.toString(),
        name: data.creator.name,
        email: data.creator.email,
      },
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error getting meetup data:', error);
    throw error;
  }
}

export async function getSortedMeetups() {
  await connectDB();
  try {
    // Sort by updatedAt descending
    const sortedData = await Meetup.find({}).sort({ updatedAt: -1 }).lean();
    return sortedData;
  } catch (error) {
    console.error('Error fetching sorted meetups:', error);
    throw new Error('Could not fetch meetups.');
  }
}
