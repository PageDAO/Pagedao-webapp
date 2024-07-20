// Import necessary React hooks and routing components
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Define the CreativeTeams functional component
const CreativeTeams = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('overview');
  // State to store the list of creative teams
  const [teams, setTeams] = useState([]);
  // New state variables
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect hook to fetch creative teams when the component mounts
  useEffect(() => {
    fetchCreativeTeams();
  }, []);

  // Function to fetch creative teams (currently using dummy data)
  const fetchCreativeTeams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement actual API call
      // For now, we're using dummy data
      const response = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, name: 'Book Cover Designers', members: 5, openProjects: 2, skills: ['Graphic Design', 'Typography'] },
        { id: 2, name: 'Sci-Fi Writers Collective', members: 8, openProjects: 1, skills: ['Creative Writing', 'Editing'] },
        { id: 3, name: 'Indie Comic Creators', members: 3, openProjects: 3, skills: ['Illustration', 'Storytelling'] },
      ]), 1000));
      setTeams(response);
    } catch (err) {
      setError('Failed to fetch teams. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to filter teams based on search term
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Return JSX for the CreativeTeams component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Creative Teams</h1>
      
      {/* Navigation tabs */}
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'teams' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('teams')}
          >
            Teams
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'projects' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
        </nav>
      </div>

      {/* Overview tab content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">What are Creative Teams?</h2>
            <p>Creative Teams are collaborative groups within PageDAO that work together on various projects, from book cover design to full-length novels. These teams leverage blockchain technology for fair compensation and transparent contribution tracking.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Join or Create a Team:</strong> Find a team that matches your skills or start your own.</li>
              <li><strong>Collaborate on Projects:</strong> Work with team members on various creative endeavors.</li>
              <li><strong>Track Contributions:</strong> All contributions are recorded on the blockchain for transparency.</li>
              <li><strong>Receive Fair Compensation:</strong> Earnings are distributed automatically based on contributions.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Benefits of Creative Teams</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Collaborate with like-minded creators</li>
              <li>Fair and transparent compensation</li>
              <li>Build your portfolio and reputation within PageDAO</li>
              <li>Access to a wider range of projects and opportunities</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">How to Join a Team</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Browse the available teams in the Teams tab</li>
              <li>Find a team that matches your skills and interests</li>
              <li>Click on "View Team Details" to learn more about the team</li>
              <li>If you're interested, click the "Apply to Join" button on the team's page</li>
              <li>Wait for the team leader to review your application</li>
            </ol>
          </section>
        </div>
      )}

      {/* Teams tab content */}
      {activeTab === 'teams' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Creative Teams</h2>
          <p className="mb-4">Browse our active creative teams and find one that matches your skills and interests.</p>
          
          <input
            type="text"
            placeholder="Search teams or skills"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

          {isLoading ? (
            <p>Loading teams...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="space-y-4">
              {filteredTeams.map((team) => (
                <li key={team.id} className="border rounded-lg p-4">
                  <h3 className="text-xl font-medium">{team.name}</h3>
                  <p className="text-gray-600">Members: {team.members}</p>
                  <p className="text-gray-600">Open Projects: {team.openProjects}</p>
                  <p className="text-gray-600">Skills: {team.skills.join(', ')}</p>
                  <Link to={`/creative-teams/${team.id}`} className="text-blue-500 hover:underline">
                    View Team Details
                  </Link>
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-6">
            <Link to="/creative-teams/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Create New Team
            </Link>
          </div>
        </div>
      )}

      {/* Projects tab content */}
      {activeTab === 'projects' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Creative Projects</h2>
          <p className="mb-4">Explore ongoing and upcoming projects from our creative teams.</p>
          {/* TODO: Implement project listing */}
          <p>Project listing coming soon...</p>
          <div className="mt-6">
            <Link to="/creative-teams/projects/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Propose New Project
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the CreativeTeams component
export default CreativeTeams;
