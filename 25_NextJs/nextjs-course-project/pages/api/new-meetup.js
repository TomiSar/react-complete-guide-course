import { connectDB } from '../../utils/connectDB';
import Meetup from '../../models/Meetup';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

// POST /api/new-meetup
async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated!' });
  }

  await connectDB();

  try {
    const data = req.body;
    const newMeetup = await Meetup.create({
      title: data.title,
      image: data.image,
      address: data.address,
      description: data.description,
      creator: session.user.id,
    });

    res.status(201).json({
      message: 'New Meetup created successfully!',
      meetup: newMeetup,
    });
  } catch (error) {
    console.error('Error creating new meetup:', error);
    res.status(500).json({ message: 'Creating new meetup failed' });
  }
}

export default handler;
