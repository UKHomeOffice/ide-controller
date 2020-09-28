// Global imports
import React from 'react';
import PropTypes from 'prop-types';

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
          ? `data:image/jpeg;base64,${datamap.get(imageID).image}`
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

Image.propTypes = {
  imageID: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

Image.defaultProps = {
  imageID: 'NO_DOC',
  imageAlt: 'Document',
};

export default Image;
