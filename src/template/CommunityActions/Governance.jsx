// Governance.jsx
import React from 'react';
import { useMachine } from '@xstate/react';
import { governanceMachine } from './governanceMachine';

const Governance = () => {
  const [state, send] = useMachine(governanceMachine);

  const renderContent = () => {
    switch (state.value) {
      case 'idle':
        return (
          <div>
            <h2>Governance Dashboard</h2>
            <button onClick={() => send('VIEW_PROPOSALS')}>View Proposals</button>
            <button onClick={() => send('CREATE_PROPOSAL')}>Create Proposal</button>
          </div>
        );
      case 'viewingProposals':
        return (
          <div>
            <h2>Active Proposals</h2>
            {/* List of proposals */}
            <button onClick={() => send('SELECT_PROPOSAL')}>View Proposal Details</button>
            <button onClick={() => send('BACK')}>Back to Dashboard</button>
          </div>
        );
      case 'viewingProposalDetails':
        return (
          <div>
            <h2>Proposal Details</h2>
            {/* Proposal details */}
            <button onClick={() => send('VOTE')}>Vote</button>
            <button onClick={() => send('BACK')}>Back to Proposals</button>
          </div>
        );
      case 'voting':
        return (
          <div>
            <h2>Vote on Proposal</h2>
            {/* Voting interface */}
            <button onClick={() => send('CONFIRM_VOTE')}>Confirm Vote</button>
            <button onClick={() => send('CANCEL')}>Cancel</button>
          </div>
        );
      case 'creatingProposal':
        return (
          <div>
            <h2>Create New Proposal</h2>
            {/* Proposal creation form */}
            <button onClick={() => send('SUBMIT')}>Submit Proposal</button>
            <button onClick={() => send('CANCEL')}>Cancel</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="governance-container">
      {renderContent()}
    </div>
  );
};

export default Governance;
