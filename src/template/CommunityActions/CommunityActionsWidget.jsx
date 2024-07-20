// src/components/Governance/CommunityActionsWidget.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const CommunityActionsWidget = () => {
  const actions = [
    {
      title: 'Creative Teams',
      description: 'Collaborate on artistic projects',
      icon: '🎨',
      color: 'bg-pink-500',
      link: '/creative-teams',
    },
    {
      title: 'Reading Clubs',
      description: 'Engage in literary discussions',
      icon: '📚',
      color: 'bg-purple-500',
      link: '/reading-clubs',
    },
    {
      title: 'Governance',
      description: 'Participate in DAO decisions',
      icon: '⚖️',
      color: 'bg-blue-500',
      link: '/governance',
    },
    {
      title: 'Development Teams',
      description: 'Build and innovate together',
      icon: '💻',
      color: 'bg-green-500',
      link: '/development-teams',
    },
  ];

  return (
    <div className="community-actions-widget">
      <h2 className="text-2xl font-bold mb-6">Community Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
          >
            <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center text-3xl mb-4`}>
              {action.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
            <p className="text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityActionsWidget;
