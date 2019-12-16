import React, { ReactNode } from "react";
import { STORE_KEY, Store } from "./store";
import StoreContext from "./context";

export type Props = {
  store: Store,
  children: ReactNode,
}

export default function Provider(props: Props) {
  return (
    <StoreContext.Provider value={{ [STORE_KEY]: props.store }}>
      {React.Children.only(props.children)}
    </StoreContext.Provider>
  );
}
