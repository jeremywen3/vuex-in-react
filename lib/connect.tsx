import React, { createElement, Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { Store } from './store';
import shallowEqual from './shallowEqual';
import StoreContext from './context';

type Props = {
  context: Store;
  children: React.ComponentType<any>;
};

type State = any;

/** The connectGetter() is a simplified function of connect, only comes mapGetterToPropsFn.
 */
export const connectGetter = (mapGetterToPropsFn: Function) => (
  WrappedComponent: any
) => {
  return connect(null, null, null, mapGetterToPropsFn)(WrappedComponent);
};

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
  class PresentationalComponent extends Component<Props, State> {
    store: any;
    mappedState: any;
    mappedGetters: any;
    unsubscribeFn: Function;

    constructor(props: Props) {
      super(props);

      this.store = props.context;

      this.mappedState =
        mapStateToPropsFn && mapStateToPropsFn(this.store.state, props);
      this.mappedGetters =
        mapGetterToPropsFn && mapGetterToPropsFn(this.store.getters, props);

      this.state = {
        ...this.mappedState,
        ...(mapDispatchToPropsFn &&
          mapDispatchToPropsFn(this.store.dispatch, props)),
        ...(mapCommitToPropsFn && mapCommitToPropsFn(this.store.commit, props)),
        ...this.mappedGetters
      };

      this.unsubscribeFn = this.store.subscribe(
        (_mutation: any, state: any) => {
          let newState: State = {};

          // update state from store state
          const newMappedState =
            mapStateToPropsFn && mapStateToPropsFn(state, props);
          if (!shallowEqual(this.mappedState, newMappedState)) {
            this.mappedState = newMappedState;
            newState = { ...this.mappedState, ...newState };
          }

          // update state from store getters, if any
          if (this.mappedGetters) {
            const newMappedGetters =
              mapGetterToPropsFn &&
              mapGetterToPropsFn(this.store.getters, props);
            if (!shallowEqual(this.mappedGetters, newMappedGetters)) {
              this.mappedGetters = newMappedGetters;
              newState = { ...newState, ...this.mappedGetters };
            }
          }

          if (Object.keys(newState).length) {
            this.setState(newState);
          }
        }
      );
    }

    componentWillUnmount() {
      if (typeof this.unsubscribeFn === 'function') {
        this.unsubscribeFn();
      }
    }

    render() {
      return createElement(
        WrappedComponent,
        { ...this.props, ...this.state },
        this.props.children
      );
    }
  }

  // PresentationalComponent.WrappedComponent = WrappedComponent;

  // Why https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  return hoistStatics(
    (props) => (
      <StoreContext.Consumer>
        {(context: Store) => (
          <PresentationalComponent context={context} {...props} />
        )}
      </StoreContext.Consumer>
    ),
    WrappedComponent
  ) as React.ComponentType<any>;
};

export default connect;
