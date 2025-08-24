import { connectDB } from '../../utils/connectDB';
import Meetup from '../../models/Meetup';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

// DELETE /api/delete-meetup
async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated!' });
  }

  await connectDB();

  try {
    const { id } = req.body;
    const meetup = await Meetup.findById(id);
    if (!meetup) {
      return res.status(404).json({ message: 'Meetup not found.' });
    }

    const isCreator = session.user.id === meetup.creator.toString();
    const isAdmin = session.user.role === 'admin';

    if (!isCreator && !isAdmin) {
      return res
        .status(403)
        .json({ message: 'Not authorized to edit this meetup!' });
    }

    await meetup.deleteOne({ _id: id });

    res.status(200).json({ message: 'Meetup deleted successfully!' });
  } catch (error) {
    console.error('Error deleting meetup:', error);
    res.status(500).json({ message: 'Deleting meetup failed' });
  }
}

export default handler;
