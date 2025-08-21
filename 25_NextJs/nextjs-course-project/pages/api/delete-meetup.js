import { ObjectId } from 'mongodb';
import { getCollectionData } from '../../utils/helpers';

// DELETE /api/delete-meetup
async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Meetup ID is required.' });
    }

    const meetupsCollection = await getCollectionData();

    const result = await meetupsCollection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Meetup not found.' });
    }

    res.status(200).json({ message: 'Meetup deleted successfully!' });
  } catch (error) {
    console.error('Error deleting meetup:', error);
    res.status(500).json({ message: 'Deleting meetup failed' });
  }
}

export default handler;
