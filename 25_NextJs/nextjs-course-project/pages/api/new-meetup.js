import { connectDB } from '../../utils/connectDB';
import Meetup from '../../models/Meetup';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
// import { upload, runMiddleware } from '../../middleware/multerMiddleware';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

console.log('Cloudinary config:', {
  cloud: process.env.CLOUD_NAME,
  key: process.env.CLOUD_API_KEY,
  secret: process.env.CLOUD_API_SECRET ? '***' : 'MISSING',
});

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

  try {
    console.log('Cloudinary config:', {
      cloud: process.env.CLOUD_NAME,
      key: process.env.CLOUD_API_KEY,
      secret: process.env.CLOUD_API_SECRET ? '***' : 'MISSING',
    });

    // await runMiddleware(req, res, upload.single('image'));
    await connectDB();

    const { title, imageBase64, address, description } = req.body;
    console.log('--- BACKEND LOGS (multer) ---');
    console.log('Body fields:', req.body);
    console.log('File:', req.file);
    console.log('--- END BACKEND LOGS ---');

    if (!imageBase64) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    const uploadResult = await cloudinary.v2.uploader.upload(imageBase64, {
      folder: 'nextjs_meetups',
    });

    const newMeetup = await Meetup.create({
      title: title,
      address: address,
      description: description,
      imageId: uploadResult.public_id,
      image: uploadResult.secure_url,
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
