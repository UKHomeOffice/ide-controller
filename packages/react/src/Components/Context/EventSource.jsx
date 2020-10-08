// Global imports
import React from 'react';

const EventSourceContext = React.createContext();

const { Provider: EventSourceProvider } = EventSourceContext;
const { Consumer: EventSourceConsumer } = EventSourceContext;

export { EventSourceContext, EventSourceProvider, EventSourceConsumer };
