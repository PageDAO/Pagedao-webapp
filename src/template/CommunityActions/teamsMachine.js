// teamsMachine.js
import { createMachine } from 'xstate';

export const teamsMachine = createMachine({
  id: 'teams',
  initial: 'browsing',
  states: {
    browsing: {
      on: {
        CREATE_TEAM: 'creatingTeam',
        JOIN_TEAM: 'joiningTeam',
        VIEW_TEAM: 'viewingTeamDetails',
      },
    },
    creatingTeam: {
      on: {
        SUBMIT: 'browsing',
        CANCEL: 'browsing',
      },
    },
    joiningTeam: {
      on: {
        CONFIRM: 'browsing',
        CANCEL: 'browsing',
      },
    },
    viewingTeamDetails: {
      on: {
        START_PROJECT: 'managingProject',
        LEAVE_TEAM: 'browsing',
        BACK: 'browsing',
      },
    },
    managingProject: {
      on: {
        UPDATE_STATUS: 'managingProject',
        COMPLETE_PROJECT: 'viewingTeamDetails',
        BACK: 'viewingTeamDetails',
      },
    },
  },
});
