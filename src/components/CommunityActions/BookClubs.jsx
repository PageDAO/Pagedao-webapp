import React from 'react';

function BookClubs() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Book Clubs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Sci-Fi Enthusiasts</h2>
                    <p className="text-gray-600 mb-2">Currently reading: "The Three-Body Problem" by Cixin Liu</p>
                    <p className="text-gray-600 mb-4">Next meeting: June 15, 2023</p>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Join Club</button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">Blockchain & Crypto</h2>
                    <p className="text-gray-600 mb-2">Currently reading: "The Infinite Machine" by Camila Russo</p>
                    <p className="text-gray-600 mb-4">Next meeting: June 20, 2023</p>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Join Club</button>
                </div>
            </div>
        </div>
    );
}

export default BookClubs;
