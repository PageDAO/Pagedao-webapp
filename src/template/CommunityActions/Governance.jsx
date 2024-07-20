import React from 'react';

function Governance() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Governance</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Active Proposals</h2>
                <ul className="space-y-4">
                    <li className="border-b pb-4">
                        <h3 className="text-xl font-medium">Proposal 1: Increase Book Publishing Budget</h3>
                        <p className="text-gray-600">Voting ends in 3 days</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Vote</button>
                    </li>
                    <li className="border-b pb-4">
                        <h3 className="text-xl font-medium">Proposal 2: New Community Event Series</h3>
                        <p className="text-gray-600">Voting ends in 5 days</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Vote</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Governance;
