// readingClubsMachine.js
import { createMachine } from 'xstate';

export const readingClubsMachine = createMachine({
  id: 'readingClubs',
  initial: 'browsing',
  states: {
    browsing: {
      on: {
        CREATE_CLUB: 'creatingClub',
        JOIN_CLUB: 'joiningClub',
        VIEW_CLUB: 'viewingClubDetails',
      },
    },
    creatingClub: {
      on: {
        SUBMIT: 'browsing',
        CANCEL: 'browsing',
      },
    },
    joiningClub: {
      on: {
        CONFIRM: 'browsing',
        CANCEL: 'browsing',
      },
    },
    viewingClubDetails: {
      on: {
        START_DISCUSSION: 'inDiscussion',
        LEAVE_CLUB: 'browsing',
        BACK: 'browsing',
      },
    },
    inDiscussion: {
      on: {
        POST_MESSAGE: 'inDiscussion',
        END_DISCUSSION: 'viewingClubDetails',
      },
    },
  },
});
