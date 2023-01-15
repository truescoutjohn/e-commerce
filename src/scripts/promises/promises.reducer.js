import { PROMISE_REJECTED, PROMISE_PENDING, PROMISE_FULLFILLED } from './promises.actions';

const returnStatePromise = (state, action, status) => ({
  ...state,
  promises: {
    ...state.promises,
    [action.payload.name]: {
      status,
      payload: action.payload.response,
      errors: action.payload.errors,
    },
  },
});

export default (state = { promises: [] }, action) => {
  switch (action.type) {
    case PROMISE_PENDING:
      return returnStatePromise(state, action, 'PENDING');
    case PROMISE_FULLFILLED:
      return returnStatePromise(state, action, 'FULLFILED');
    case PROMISE_REJECTED:
      return returnStatePromise(state, action, 'REJECTED');
    default:
      return state;
  }
};
