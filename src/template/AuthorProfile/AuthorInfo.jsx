// AuthorInfo.jsx
import React from 'react';

function AuthorInfo({ author, iscurrentuser }) {
  return (
    <div>
      <h2>{author.name}</h2>
      <p>{author.bio}</p>
      {/* Add AuthorAvatar, AuthorAddresses, AuthorWebpage, and AuthorSocial here */}
    </div>
  );
}

export default AuthorInfo;