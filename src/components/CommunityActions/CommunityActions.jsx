import React from 'react';
import Governance from './Governance';
import BuilderDAOGroups from './BuilderDAOGroups';
import BookClubs from './BookClubs';

const CommunityActions = () => {
  return (
    <div className="community-actions">
      <h1>Community Actions</h1>
      <section className="governance">
        <h2>Governance</h2>
        <Governance />
      </section>
      <section className="builder-dao-groups">
        <h2>DAO Groups</h2>
        <BuilderDAOGroups />
      </section>
      <section className="book-clubs">
        <h2>Book Clubs</h2>
        <BookClubs />
      </section>
    </div>
  );
};

export default CommunityActions;
