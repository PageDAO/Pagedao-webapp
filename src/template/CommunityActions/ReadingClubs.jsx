import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReadingClubs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const readingClubs = [
    { id: 1, name: "Dune Readers", book: "Dune by Frank Herbert", members: 15, accessTokenPrice: "50 PAGE" },
    { id: 2, name: "Neuromancer Club", book: "Neuromancer by William Gibson", members: 8, accessTokenPrice: "30 PAGE" },
    { id: 3, name: "Foundation Series Fans", book: "Foundation by Isaac Asimov", members: 20, accessTokenPrice: "70 PAGE" },
  ];

  const filteredReadingClubs = readingClubs.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.reading.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reading Clubs</h1>
      
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'clubs' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('clubs')}
          >
            Reading Clubs
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('create')}
          >
            Create Club
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">NFT-Powered Reading Clubs</h2>
            <p>Our reading clubs are unique, NFT-powered communities where literature owners can create and join exclusive discussion groups. Each club is tied to a specific reading NFT, ensuring authentic and engaged conversations.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Own a Reading NFT:</strong> Purchase or mint an NFT of your favorite reading on Base Mainnet.</li>
              <li><strong>Create or Join a Club:</strong> Start a new club for your book or join an existing one.</li>
              <li><strong>Purchase Access Tokens:</strong> Buy PAGE tokens to join clubs for readings you don't own.</li>
              <li><strong>Participate:</strong> Engage in discussions, share insights, and connect with fellow readers.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Exclusive access to like-minded readers</li>
              <li>Earn rewards for active participation</li>
              <li>Potential for increased value of your literary NFTs</li>
              <li>Direct engagement with authors and publishers</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Bonding Curve Mechanism</h2>
            <p>Our reading clubs use a bonding curve to determine the price of access tokens. This means:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>The price of tokens increases as more are purchased</li>
              <li>Early joiners get better prices</li>
              <li>The value of your tokens may increase over time</li>
            </ul>
          </section>
        </div>
      )}

      {activeTab === 'clubs' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Reading Clubs</h2>
          <input
            type="text"
            placeholder="Search reading clubs or books"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

          <ul className="space-y-4">
            {filteredReadingClubs.map((club) => (
              <li key={club.id} className="border rounded-lg p-4">
                <h3 className="text-xl font-medium">{club.name}</h3>
                <p className="text-gray-600">Reading: {club.reading}</p>
                <p className="text-gray-600">Members: {club.members}</p>
                <p className="text-gray-600">Access Token Price: {club.accessTokenPrice}</p>
                <button 
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Join Club
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'create' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create a New Reading Club</h2>
          <p className="mb-4">To create a new reading club:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Ensure you own the NFT of the reading you want to create a club for</li>
            <li>Click the "Create Club" button below</li>
            <li>Select the literary NFT you want to use</li>
            <li>Set initial parameters for your club (e.g., initial token price, maximum members)</li>
            <li>Confirm the creation transaction</li>
          </ol>
          <button 
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Club
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadingClubs;
