// Global imports
import React from 'react';

const ConfigContext = React.createContext();

const { Provider: ConfigProvider } = ConfigContext;
const { Consumer: ConfigConsumer } = ConfigContext;

export { ConfigContext, ConfigProvider, ConfigConsumer };
