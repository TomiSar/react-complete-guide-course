import { connectDB } from '../../../utils/connectDb';
import User from '../../../models/User';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await connectDB();

  const { name, email, password } = req.body;

  if (!name || !email || !password || password.trim().length < 6) {
    return res.status(422).json({ message: 'Validation error.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(422)
      .json({ message: 'User with this email already exists!' });
  }

  const newUser = await User.create({ name, email, password });

  res.status(201).json({ message: 'User created!', user: newUser });
}

export default handler;
