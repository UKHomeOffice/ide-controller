// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import Image from '../Atoms/Image';

const ImageCard = ({ image, imageAlt, children, className }) => (
  <div className={`${className}`}>
    {image ? <Image image={image} imageAlt={imageAlt} /> : children}
  </div>
);

ImageCard.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

ImageCard.defaultProps = {
  image: '',
  imageAlt: '',
  children: [],
  className: null,
};

export default ImageCard;
