import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Governance = () => {
  const [activeTab, setActiveTab] = useState('proposals');

  // Placeholder data - replace with actual data from backend/blockchain later
  const proposals = [
    { id: 1, title: 'Increase Book Publishing Budget', status: 'Active', votingEnds: '3 days' },
    { id: 2, title: 'New Community Event Series', status: 'Active', votingEnds: '5 days' },
    { id: 3, title: 'Update DAO Constitution', status: 'Passed', votingEnds: 'Ended' },
  ];

  const treasury = {
    totalValue: '1,000,000 PAGE',
    distribution: [
      { name: 'Community Pool', value: '500,000 PAGE' },
      { name: 'Staking Rewards', value: '300,000 PAGE' },
      { name: 'Development Fund', value: '200,000 PAGE' },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Governance</h1>
      
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'proposals' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('proposals')}
          >
            Proposals
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'treasury' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('treasury')}
          >
            Treasury
          </button>
        </nav>
      </div>

      {activeTab === 'proposals' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Proposals</h2>
          <ul className="space-y-4">
            {proposals.map((proposal) => (
              <li key={proposal.id} className="border rounded-lg p-4">
                <h3 className="text-xl font-medium">{proposal.title}</h3>
                <p className="text-gray-600">Status: {proposal.status}</p>
                <p className="text-gray-600">Voting ends: {proposal.votingEnds}</p>
                <Link to={`/governance/proposal/${proposal.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link to="/governance/create-proposal" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Create New Proposal
            </Link>
          </div>
        </div>
      )}

      {activeTab === 'treasury' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Treasury Overview</h2>
          <p className="text-xl mb-4">Total Value: {treasury.totalValue}</p>
          <h3 className="text-xl font-semibold mb-2">Distribution</h3>
          <ul className="space-y-2">
            {treasury.distribution.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Governance;