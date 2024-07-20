import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Governance = () => {
  const [activeTab, setActiveTab] = useState('proposals');
  const [members, setMembers] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [votingPower, setVotingPower] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    fetchMembers();
    fetchProposals();
    fetchVotingPower();
    fetchRecentActivity();
  }, []);

  const fetchMembers = async () => {
    // TODO: Implement API call to get members who have staked $PAGE
    // setMembers(response.data);
  };

  const fetchProposals = async () => {
    // TODO: Implement API call to get active proposals
    // setProposals(response.data);
  };

  const fetchVotingPower = async () => {
    // TODO: Implement API call to get voting power overview
    // setVotingPower(response.data);
  };

  const fetchRecentActivity = async () => {
    // TODO: Implement API call to get recent governance activity
    // setRecentActivity(response.data);
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
            className={`px-3 py-2 rounded-md ${activeTab === 'members' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('members')}
          >
            Members
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'voting-power' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('voting-power')}
          >
            Voting Power
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

      {activeTab === 'members' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Members with Staked $PAGE</h2>
          <ul className="space-y-2">
            {members.map((member, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <span className="font-mono">{member.address}</span>
                <span>{member.stakedAmount} $PAGE</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'voting-power' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Voting Power Overview</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>Total Staked: {votingPower.totalStaked} $PAGE</p>
            <p>Your Stake: {votingPower.yourStake} $PAGE</p>
            <p>Your Voting Power: {votingPower.yourVotingPower}%</p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          {recentActivity.map((activity, index) => (
            <li key={index} className="text-sm text-gray-600">
              {activity.description} - {activity.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Governance;
