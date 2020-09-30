// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import Image from '../Atoms/Image';

const ImageCard = ({ image, imageAlt, children }) => (
  <div className="photoContainer--photo">
    <span className="shadow">
      {image ? <Image image={image} imageAlt={imageAlt} /> : children}
    </span>
  </div>
);

ImageCard.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ImageCard.defaultProps = {
  image: '',
  imageAlt: '',
  children: [],
};

export default ImageCard;
