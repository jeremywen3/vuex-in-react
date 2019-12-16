import React from "react";
import { STORE_KEY, Store} from "./store";

export type ContextProps = { 
  [STORE_KEY]: Store,
}

const StoreContext = React.createContext<ContextProps>({
  [STORE_KEY]: {} as Store
});

export default StoreContext;
