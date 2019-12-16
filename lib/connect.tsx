import React, { createElement, useEffect, useState, EffectCallback } from "react";
import hoistStatics from "hoist-non-react-statics";

import { STORE_KEY, Store} from "./store";
import shallowEqual from "./shallowEqual";

import StoreContext from "./context";

type Props = {
  [STORE_KEY]: Store,
  children: React.ComponentType<any>
};

const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
};

export const connectGetter =  (
  mapGetterToPropsFn: Function
) => (WrappedComponent: any) => {
  return connect(null, null, null, mapGetterToPropsFn)(WrappedComponent)
}


/** The connect() function connects a React component to a Vuex store.
 * * @param {Function} mapStateToPropsFn - mapping the Vuex state to props that are passed to the component
 * * @param {Function} mapDispatchToPropsFn - mapping the Vuex dispatch action to props that are passed to the component
 * * @param {Function} mapCommitToPropsFn - mapping the Vuex commit action to props that are passed to the component
 * * @param {Function} mapGetterToPropsFn - mapping the Vuex getter to props that are passed to the component
 */
const connect = (
  mapStateToPropsFn: Function | null,
  mapDispatchToPropsFn?: Function | null,
  mapCommitToPropsFn?: Function | null,
  mapGetterToPropsFn?: Function | null
) => (WrappedComponent: any) => {
  function PresentationalComponent(props: Props) {
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

      // Bug fix: In react-vuex, it uses mappedState, but i think we should use initialState !!!!
      if (initialState) {
        unsubscribeFn = store.subscribe((_mutation: any, state: any) => {
          let newState: object = {};

          // update state from store state
          const newMappedState = mapStateToPropsFn && mapStateToPropsFn(state, props);
          if (!shallowEqual(mappedState, newMappedState)) {
            mappedState = newMappedState;
            newState = { ...newState, ...mappedState };
          }

          // update state from store getters, if any
          if (mappedGetters) {
            const newMappedGetters = mapGetterToPropsFn && mapGetterToPropsFn(store.getters, props);
            if (!shallowEqual(mappedGetters, newMappedGetters)) {
              mappedGetters = newMappedGetters;
              newState = { ...newState, ...mappedGetters };
            }
          }

          if (Object.keys(newState).length) {
            setState((previousState: object) => { return {...previousState, ...newState}});
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
  return hoistStatics(PresentationalComponent, WrappedComponent) as React.ComponentType<any>;
};

export default connect;
