"use client"

import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get('/api/books');
    setBooks(response.data.data);
  };

  const addBook = async () => {
    const response = await axios.post('/api/books', { title, author, description });
    fetchBooks();
    setTitle('');
    setAuthor('');
    setDescription('');
  };

  const deleteBook = async (id) => {
    await axios.delete(`/api/books/${id}`);
    fetchBooks();
  };

  const updateBook = async (id, newTitle, newAuthor, newDescription) => {
    await axios.put(`/api/books/${id}`, { title: newTitle, author: newAuthor, description: newDescription });
    fetchBooks();
  };

  return (
    <div className=" min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Book Collection</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
        <input
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button 
        className=" w-full bg-blue-500 text-white p-2 rounded"
        onClick={addBook}
        >
        Add Book
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <p className="text-gray-700 mb-2">{book.author}</p>
            <p className="text-gray-500">{book.description}</p>
            <div className="mt-4 flex space-x-2">
              <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => deleteBook(book._id)}
              >
              Delete
              </button>

              <button
              className="bg-yellow-500 text-white p-2 rounded"
              onClick={() => updateBook(
                book._id,
                prompt('New title: ', book.title),
                prompt('New author: ', book.author),
                prompt('New description: ', book.description),
              )}
              >
              Update
              </button>
            </div>
          </div>
        ))}

      </div>
      
    </div>
  )

};