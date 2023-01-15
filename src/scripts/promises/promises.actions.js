export const PROMISE_PENDING = 'PROMISE/PENDING';
export const PROMISE_FULLFILLED = 'PROMISE/FULLFILLED';
export const PROMISE_REJECTED = 'PROMISE/REJECTED';

export const actionPending = name => ({ type: PROMISE_PENDING, payload: { name } });

export const actionFulfilled = (name, response) => ({
  type: PROMISE_FULLFILLED,
  payload: { response, name },
});

export const actionRejected = (name, errors) => ({
  type: PROMISE_REJECTED,
  payload: { errors, name },
});

export const actionPromise = (name, promise) => async dispatch => {
  await dispatch(actionPending(name));
  try {
    const result = await promise;
    await dispatch(actionFulfilled(name, result));
  } catch (exception) {
    await dispatch(actionRejected(name, exception.message));
  }
};
