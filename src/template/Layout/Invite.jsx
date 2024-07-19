import React from 'react';

const Invite = () => {
  const emails = new Array(5);

  return (
    <div className="flex flex-col">
      {emails.map((email, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            type="text"
            value={email}
            className="w-64 p-2 border border-gray-300 rounded-l"
            readOnly
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r">
            Copy Invitation
          </button>
        </div>
      ))}
    </div>
  );
};

export default Invite;