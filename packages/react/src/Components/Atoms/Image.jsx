// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import '../Controller.scss';

const Image = ({ image, imageAlt }) => {
  return (
    <div
      className="photoContainer--photo medium"
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
