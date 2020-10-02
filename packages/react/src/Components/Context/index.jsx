// Global imports
import React from 'react';

const Context = React.createContext();

const { Provider } = Context;
const { Consumer } = Context;

const withContext = (Component) => (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Consumer>{(context) => <Component {...props} value={context} />}</Consumer>
);

export { Provider, Consumer, withContext };
