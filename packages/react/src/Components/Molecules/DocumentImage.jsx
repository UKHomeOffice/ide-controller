// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { Column } from '../Layout';
import ImageCard from './ImageCard';

const DocumentImage = ({ image, imageAlt }) => {
  return (
    <Column size="one-third padding-5">
      <ImageCard image={image} imageAlt={imageAlt} />
    </Column>
  );
};

DocumentImage.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
};

DocumentImage.defaultProps = {
  image: '',
  imageAlt: '',
};

export default DocumentImage;
