import { ObjectId } from 'mongodb';
import { getCollectionData } from '../../utils/helpers';

// PUT /api/edit-meetup
async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { id, title, image, address, description } = req.body;
    const meetupsCollection = await getCollectionData();

    const result = await meetupsCollection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { title, image, address, description } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Meetup not found.' });
    }

    res.status(200).json({ message: 'Meetup updated successfully!', result });
  } catch (error) {
    console.error('Error updating meetup:', error);
    res.status(500).json({ message: 'Updating meetup failed' });
  }
}

export default handler;
