// Global imports
import React from 'react';

const StoreContext = React.createContext();

const StoreProvider = StoreContext.Provider;
const StoreConsumer = StoreContext.Consumer;

export { StoreProvider, StoreConsumer };
