import React from 'react';
import { Store } from './store';

const StoreContext = React.createContext<Store>(null as any);

export default StoreContext;
