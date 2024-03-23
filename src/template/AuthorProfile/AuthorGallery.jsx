// AuthorGallery.jsx
import React from 'react';

function AuthorGallery({ books, iscurrentuser }) {
  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          {/* Add more book details here */}
        </div>
      ))}
    </div>
  );
}

export default AuthorGallery;