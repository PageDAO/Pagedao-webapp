
// src/pages/CreativeTeams.jsx

import React, { useState, useEffect } from 'react';

const CreativeTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // TODO: Fetch creative teams from API
    // For now, we'll use dummy data
    setTeams([
      { id: 1, name: 'Cover Art Designers', members: 12, currentProject: 'Sci-Fi Anthology Covers' },
      { id: 2, name: 'Illustrators United', members: 8, currentProject: 'Children\'s Book Illustrations' },
      { id: 3, name: 'Typography Enthusiasts', members: 5, currentProject: 'Custom Font for Fantasy Series' },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Creative Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">{team.name}</h2>
            <p className="text-gray-600 mb-2">Members: {team.members}</p>
            <p className="text-gray-600 mb-4">Current Project: {team.currentProject}</p>
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Join Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeTeams;