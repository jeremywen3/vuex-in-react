export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const INCREMENT_START = 'INCREMENT_START';
export const INCREMENT_STOP = 'INCREMENT_STOP';

export default {
  increment: (value = 1) => ({
    type: INCREMENT,
    value,
  }),
  decrement: (value = 1) => ({
    type: DECREMENT,
    value,
  }),
};
