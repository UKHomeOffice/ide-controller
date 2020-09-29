// Global imports
import React from 'react';

// Local imports
import { ImageConsumer } from '../ImageContext';
import Config from '../Config';
import '../Controller.css';

const constructImageURL = (base64) => `data:image/jpeg;base64,${base64}`;

const Image = (imageID, imageAlt) => {
  return (
    <ImageConsumer>
      {(fullPage) => {
        const datamap = new Map(fullPage);
        const image = datamap.has(imageID)
          ? constructImageURL(datamap.get(imageID).image)
          : Config.blankAvatar;
        return (
          <div
            className="photoContainer--photo medium"
            alt={imageAlt}
            style={{ backgroundImage: `url(${image})` }}
          />
        );
      }}
    </ImageConsumer>
  );
};

export default Image;
