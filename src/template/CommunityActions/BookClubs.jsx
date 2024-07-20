// src/pages/BookClubs.jsx

import React, { useState, useEffect } from 'react';

const BookClubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // TODO: Fetch book clubs from API
    // For now, we'll use dummy data
    setClubs([
      { id: 1, name: 'Sci-Fi Enthusiasts', members: 20, currentBook: 'Dune by Frank Herbert', nextMeeting: '2023-06-15' },
      { id: 2, name: 'Mystery Lovers', members: 15, currentBook: 'The Girl with the Dragon Tattoo by Stieg Larsson', nextMeeting: '2023-06-20' },
      { id: 3, name: 'Classic Literature', members: 12, currentBook: 'Pride and Prejudice by Jane Austen', nextMeeting: '2023-06-18' },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book Clubs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">{club.name}</h2>
            <p className="text-gray-600 mb-2">Members: {club.members}</p>
            <p className="text-gray-600 mb-2">Current Book: {club.currentBook}</p>
            <p className="text-gray-600 mb-4">Next Meeting: {club.nextMeeting}</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Join Club
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookClubs;



