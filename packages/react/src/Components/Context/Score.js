// Global imports
import React from 'react';

const ScoreContext = React.createContext();

const { Provider: ScoreProvider } = ScoreContext;
const { Consumer: ScoreConsumer } = ScoreContext;

export { ScoreContext, ScoreProvider, ScoreConsumer };
