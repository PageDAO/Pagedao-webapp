import React, { useState, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { teamsMachine } from './teamsMachine';

const DevelopmentTeams = () => {
  const [state, send] = useMachine(teamsMachine);
  const [activeTab, setActiveTab] = useState('overview');
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDevelopmentTeams();
  }, []);

  const fetchDevelopmentTeams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, name: 'Blockchain Innovators', members: 5, openProjects: 2, skills: ['Solidity', 'Smart Contracts', 'Web3.js'] },
        { id: 2, name: 'Frontend Wizards', members: 8, openProjects: 1, skills: ['React', 'TypeScript', 'UI/UX Design'] },
        { id: 3, name: 'Backend Architects', members: 6, openProjects: 3, skills: ['Node.js', 'Database Design', 'API Development'] },
      ]), 1000));
      setTeams(response);
    } catch (err) {
      setError('Failed to fetch teams. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderContent = () => {
    switch (state.value) {
      case 'browsing':
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Development Teams</h1>
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

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-2">What are Development Teams?</h2>
                  <p>Development Teams are collaborative groups within PageDAO focused on building and maintaining the technical infrastructure of our ecosystem. These teams work on various aspects of blockchain technology, web development, and software engineering to support PageDAO's mission.</p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
                  <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Join or Create a Team:</strong> Find a team that matches your technical skills or start your own.</li>
                    <li><strong>Collaborate on Projects:</strong> Work with team members on various development tasks and features.</li>
                    <li><strong>Track Contributions:</strong> All code contributions are tracked through version control and on-chain records.</li>
                    <li><strong>Receive Fair Compensation:</strong> Earnings are distributed based on contributions and impact.</li>
                  </ol>
                </section>
                {/* ... (other sections) ... */}
              </div>
            )}

            {activeTab === 'teams' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Active Development Teams</h2>
                <p className="mb-4">Browse our active development teams and find one that matches your skills and interests.</p>
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
                        <button onClick={() => send('VIEW_TEAM')} className="text-blue-500 hover:underline">
                          View Team Details
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6">
                  <button onClick={() => send('CREATE_TEAM')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Create New Team
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Development Projects</h2>
                <p className="mb-4">Explore ongoing and upcoming development projects from our teams.</p>
                <p>Project listing coming soon...</p>
                <div className="mt-6">
                  <button onClick={() => send('START_PROJECT')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Propose New Project
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'creatingTeam':
        return (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Create New Development Team</h2>
            {/* Add form for creating a new team */}
            <button onClick={() => send('CANCEL')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Cancel
            </button>
          </div>
        );
      case 'viewingTeamDetails':
        return (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Team Details</h2>
            {/* Add team details content */}
            <button onClick={() => send('BACK')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Back to Teams
            </button>
          </div>
        );
      case 'managingProject':
        return (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Manage Project</h2>
            {/* Add project management content */}
            <button onClick={() => send('BACK')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Back to Team Details
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return renderContent();
};

export default DevelopmentTeams;
