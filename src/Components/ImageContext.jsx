// Global imports
import React from 'react';

const ImageContext = React.createContext();

const ImageProvider = ImageContext.Provider;
const ImageConsumer = ImageContext.Consumer;

export { ImageProvider, ImageConsumer };
