// Global imports
import React from 'react';

const StatusContext = React.createContext();

const { Provider: StatusProvider } = StatusContext;
const { Consumer: StatusConsumer } = StatusContext;

export { StatusContext, StatusProvider, StatusConsumer };
