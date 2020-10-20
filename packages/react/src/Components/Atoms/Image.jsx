// Global imports
import PropTypes from 'prop-types';
import React from 'react';

const Image = ({ image, imageAlt }) => {
  return (
    <div
      className="photoContainer--photo"
      alt={imageAlt}
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

Image.propTypes = {
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
};

Image.defaultProps = {
  imageAlt: '',
};

export default Image;
