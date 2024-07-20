import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Governance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // Fetch proposals (to be implemented)
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    // TODO: Implement API call to get active proposals
    // For now, we'll use dummy data
    setProposals([
      { id: 1, title: 'Increase Book Publishing Budget', status: 'Active', votingEnds: '3 days' },
      { id: 2, title: 'New Community Event Series', status: 'Active', votingEnds: '5 days' },
      { id: 3, title: 'Update DAO Constitution', status: 'Passed', votingEnds: 'Ended' },
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Governance</h1>
      
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'proposals' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('proposals')}
          >
            Proposals
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'voting' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('voting')}
          >
            Voting
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">What is Governance?</h2>
            <p>Governance is the process by which we, as a community, make decisions about the future of PageDAO. It allows all members to have a say in important matters such as budget allocation, new initiatives, and changes to our rules.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Propose:</strong> Any member can create a proposal for a change or new initiative.</li>
              <li><strong>Discuss:</strong> The community discusses the proposal, asking questions and suggesting improvements.</li>
              <li><strong>Vote:</strong> After discussion, members vote on whether to accept or reject the proposal.</li>
              <li><strong>Implement:</strong> If a proposal passes, it's implemented by the community.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Your Voting Power</h2>
            <p>Your voting power is determined by the amount of $PAGE tokens you have staked. The more tokens you stake, the more influence you have in the voting process.</p>
          </section>
        </div>
      )}

      {activeTab === 'proposals' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Proposals</h2>
          <p className="mb-4">Here you can view all current proposals and their status. Click on a proposal to see more details and cast your vote.</p>
          <ul className="space-y-4">
            {proposals.map((proposal) => (
              <li key={proposal.id} className="border rounded-lg p-4">
                <h3 className="text-xl font-medium">{proposal.title}</h3>
                <p className="text-gray-600">Status: {proposal.status}</p>
                <p className="text-gray-600">Voting ends: {proposal.votingEnds}</p>
                <Link to={`/governance/proposal/${proposal.id}`} className="text-blue-500 hover:underline">
                  View Details and Vote
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

      {activeTab === 'voting' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">How to Vote</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <strong>Connect Your Wallet:</strong> Ensure your wallet (containing your $PAGE tokens) is connected to the platform.
            </li>
            <li>
              <strong>Review Proposals:</strong> Go through the list of active proposals and click on the ones you're interested in.
            </li>
            <li>
              <strong>Cast Your Vote:</strong> After reviewing a proposal, you can vote 'Yes', 'No', or 'Abstain'.
            </li>
            <li>
              <strong>Confirm Transaction:</strong> Voting requires a small transaction on the blockchain to be recorded. Confirm this in your wallet.
            </li>
          </ol>
          <div className="mt-6 bg-blue-100 border-l-4 border-blue-500 p-4">
            <p className="font-semibold">Remember:</p>
            <ul className="list-disc list-inside">
              <li>You can change your vote until the voting period ends.</li>
              <li>Your voting power is based on your staked $PAGE tokens.</li>
              <li>Participate in discussions to make informed decisions!</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Governance;
