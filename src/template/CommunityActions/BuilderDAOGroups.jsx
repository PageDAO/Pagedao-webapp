import React from 'react';

function BuilderDAOGroups() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Builder DAO Groups</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Web3 Book Publishing</h2>
                    <p className="text-gray-600 mb-4">A group focused on leveraging Web3 technologies for book publishing.</p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Join Group</button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">NFT Cover Art</h2>
                    <p className="text-gray-600 mb-4">Exploring the use of NFTs for book cover art and illustrations.</p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Join Group</button>
                </div>
            </div>
        </div>
    );
}

export default BuilderDAOGroups;
