import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide the book title.'],
  },
  author: {
    type: String,
    required: [true, 'Please provide the book author.'],
  },
  description: {
    type: String,
  },
});

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
