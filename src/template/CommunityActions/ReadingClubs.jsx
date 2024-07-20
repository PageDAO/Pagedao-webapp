// ReadingClubs.jsx
import React from 'react';
import { useMachine } from '@xstate/react';
import { readingClubsMachine } from './readingClubsMachine';

const ReadingClubs = () => {
  const [state, send] = useMachine(readingClubsMachine);

  const renderContent = () => {
    switch (state.value) {
      case 'browsing':
        return (
          <div>
            <h2>Reading Clubs</h2>
            <button onClick={() => send('CREATE_CLUB')}>Create Club</button>
            <button onClick={() => send('JOIN_CLUB')}>Join Club</button>
            <button onClick={() => send('VIEW_CLUB')}>View Club Details</button>
          </div>
        );
      case 'creatingClub':
        return (
          <div>
            <h2>Create New Reading Club</h2>
            {/* Club creation form */}
            <button onClick={() => send('SUBMIT')}>Submit</button>
            <button onClick={() => send('CANCEL')}>Cancel</button>
          </div>
        );
      case 'joiningClub':
        return (
          <div>
            <h2>Join Reading Club</h2>
            {/* Club joining interface */}
            <button onClick={() => send('CONFIRM')}>Confirm</button>
            <button onClick={() => send('CANCEL')}>Cancel</button>
          </div>
        );
      case 'viewingClubDetails':
        return (
          <div>
            <h2>Club Details</h2>
            <button onClick={() => send('START_DISCUSSION')}>Start Discussion</button>
            <button onClick={() => send('LEAVE_CLUB')}>Leave Club</button>
            <button onClick={() => send('BACK')}>Back to Clubs</button>
          </div>
        );
      case 'inDiscussion':
        return (
          <div>
            <h2>Club Discussion</h2>
            {/* Discussion interface */}
            <button onClick={() => send('POST_MESSAGE')}>Post Message</button>
            <button onClick={() => send('END_DISCUSSION')}>End Discussion</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="reading-clubs-container">
      {renderContent()}
    </div>
  );
};

export default ReadingClubs;
