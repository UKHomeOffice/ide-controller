// Global imports
import React from 'react';

const LivePhotoContext = React.createContext();

const { Provider: LivePhotoProvider } = LivePhotoContext;
const { Consumer: LivePhotoConsumer } = LivePhotoContext;

export { LivePhotoContext, LivePhotoProvider, LivePhotoConsumer };
