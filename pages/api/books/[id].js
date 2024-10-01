import dbConnect from '../../../lib/dbConnect';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const book = await Book.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!book) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: book });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedBook = await Book.deleteOne({ _id: req.query.id });
        if (!deletedBook) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
