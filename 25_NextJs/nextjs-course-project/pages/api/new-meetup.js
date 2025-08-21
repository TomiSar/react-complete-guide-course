import { getCollectionData } from '../../utils/helpers';

// POST /api/new-meetup
async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const data = req.body;
    const meetupsCollection = await getCollectionData();
    const newMeetupData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await meetupsCollection.insertOne(newMeetupData);

    res.status(201).json({
      message: 'New Meetup created successfully!',
      meetupId: result.insertedId,
    });
  } catch (error) {
    console.error('Error creating new meetup:', error);
    res.status(500).json({ message: 'Creating new meetup failed' });
  }
}

export default handler;
