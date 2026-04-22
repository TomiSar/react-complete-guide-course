import mongoose from 'mongoose';

const MeetupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    imageId: { type: String, required: true },
    image: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Meetup || mongoose.model('Meetup', MeetupSchema);
