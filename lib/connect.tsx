import React, { createElement, useEffect, useState, EffectCallback } from "react";
import hoistStatics from "hoist-non-react-statics";

import { STORE_KEY } from "./store";
import shallowEqual from "./shallowEqual";

import StoreContext from "./context";

// type Props = {
//   [STORE_KEY]: Store,
//   children: ReactNode[] | ReactNode
// };

const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
};


/** The connect() function connects a React component to a Vuex store.
 * * @param {Function} mapStateToPropsFn - mapping the Vuex state to props that are passed to the component
 * * @param {Function} mapDispatchToPropsFn - mapping the Vuex dispatch action to props that are passed to the component
 * * @param {Function} mapCommitToPropsFn - mapping the Vuex commit action to props that are passed to the component
 * * @param {Function} mapGetterToPropsFn - mapping the Vuex getter to props that are passed to the component
 */
export default (
  mapStateToPropsFn: Function,
  mapDispatchToPropsFn: Function,
  mapCommitToPropsFn: Function,
  mapGetterToPropsFn: Function
) => (WrappedComponent: any) => {
  function PresentationalComponent(props: any) {
    const context = React.useContext(StoreContext);
    const [state, setState] = useState();

    useEffectOnce(() => {
      const store = props[STORE_KEY] || context[STORE_KEY];
      let mappedState =
        mapStateToPropsFn && mapStateToPropsFn(store.state, props);
      let mappedGetters =
        mapGetterToPropsFn && mapGetterToPropsFn(store.getters, props);

      const initialState = {
        ...mappedState,
        ...(mapDispatchToPropsFn &&
          mapDispatchToPropsFn(store.dispatch, props)),
        ...(mapCommitToPropsFn && mapCommitToPropsFn(store.commit, props)),
        ...mappedGetters
      };

      setState(initialState);

      let unsubscribeFn: Function | undefined = undefined;
      if (mappedState) {
        unsubscribeFn = store.subscribe((_mutation: any, state: any) => {
          console.log("trigger subscribe now");
          let newState = {};

          // update state from store state
          const newMappedState = mapStateToPropsFn(state, props);
          if (!shallowEqual(mappedState, newMappedState)) {
            mappedState = newMappedState;
            newState = { ...newState, ...mappedState };
          }

          // update state from store getters, if any
          if (mappedGetters) {
            const newMappedGetters = mapGetterToPropsFn(store.getters, props);
            if (!shallowEqual(mappedGetters, newMappedGetters)) {
              mappedGetters = newMappedGetters;
              newState = { ...newState, ...mappedGetters };
            }
          }

          if (Object.keys(newState).length) {
            setState((previousState: any) =>
              Object.assign({}, previousState, newState)
            );
          }
        });
      }

      return () => {
        if (typeof unsubscribeFn === "function") {
          console.log("hide");
          unsubscribeFn();
        }
      };
    });

    return createElement(
      WrappedComponent,
      { ...props, ...state },
      props.children
    );
  }

  PresentationalComponent.WrappedComponent = WrappedComponent;

  // Why https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  return hoistStatics(PresentationalComponent, WrappedComponent);
};
