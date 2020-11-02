// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { Image } from '../Atoms';

const ImageCard = ({ image, imageAlt, className }) => (
  <Image image={image} imageAlt={imageAlt} className={className} />
);

ImageCard.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  className: PropTypes.string,
};

ImageCard.defaultProps = {
  image: '',
  imageAlt: '',
  className: '',
};

export default ImageCard;
