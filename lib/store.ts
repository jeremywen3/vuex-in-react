export const STORE_KEY = "$store";

/**
 * Minimum required fields for store
 */
export type Store = {
  subscribe: Function,
  dispatch: Function,
  getters: Function,
  commit: Function,
  state: object
}

export default {
  STORE_KEY
};

