import { connectDB } from '../../utils/connectDB';
import Meetup from '../../models/Meetup';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

// PUT /api/edit-meetup
async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated!' });
  }

  await connectDB();

  try {
    const { id, title, image, address, description } = req.body;

    if (!title || !image || !address || !description) {
      return res.status(400).json({ message: 'Missing required fields data.' });
    }

    const meetup = await Meetup.findById(id);
    if (!meetup) {
      return res.status(404).json({ message: 'Meetup not found.' });
    }

    // Important: Check if the user is the creator of thee meetup or Admin
    const isCreator = session.user.id === meetup.creator.toString();
    const isAdmin = session.user.role === 'admin';

    if (!isCreator && !isAdmin) {
      return res
        .status(403)
        .json({ message: 'Not authorized to edit this meetup!' });
    }

    // Updated data
    meetup.title = title;
    meetup.image = image;
    meetup.address = address;
    meetup.description = description;

    const updatedMeetup = await meetup.save();
    res
      .status(200)
      .json({ message: 'Meetup updated successfully!', meetup: updatedMeetup });
  } catch (error) {
    console.error('Error updating meetup:', error);
    res.status(500).json({ message: 'Updating meetup failed' });
  }
}

export default handler;
