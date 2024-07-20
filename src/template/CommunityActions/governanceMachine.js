// governanceMachine.js
import { createMachine } from 'xstate';

export const governanceMachine = createMachine({
  id: 'governance',
  initial: 'idle',
  states: {
    idle: {
      on: {
        VIEW_PROPOSALS: 'viewingProposals',
        CREATE_PROPOSAL: 'creatingProposal',
      },
    },
    viewingProposals: {
      on: {
        SELECT_PROPOSAL: 'viewingProposalDetails',
        BACK: 'idle',
      },
    },
    viewingProposalDetails: {
      on: {
        VOTE: 'voting',
        BACK: 'viewingProposals',
      },
    },
    voting: {
      on: {
        CONFIRM_VOTE: 'viewingProposalDetails',
        CANCEL: 'viewingProposalDetails',
      },
    },
    creatingProposal: {
      on: {
        SUBMIT: 'idle',
        CANCEL: 'idle',
      },
    },
  },
});
